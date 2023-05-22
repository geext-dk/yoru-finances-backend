import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { CreateReceiptInput } from './dtos/create-receipt.input'
import { ReceiptModel } from './dtos/receipt.model'
import { ReceiptProductModel } from './dtos/receipt-product.model'
import { UpdateReceiptInput } from './dtos/update-receipt.input'
import { ReceiptEntity } from './entities/receipt.entity'
import { ReceiptProductEntity } from './entities/receipt-product.entity'

@Injectable()
export class ReceiptsService {
  private readonly logger = new Logger(ReceiptsService.name)

  constructor(
    private dataSource: DataSource,
    @InjectRepository(ReceiptEntity)
    private receiptsRepository: Repository<ReceiptEntity>,
    @InjectRepository(ReceiptProductEntity)
    private receiptProductsRepository: Repository<ReceiptProductEntity>,
  ) {}

  async findById(id: string, userId: string): Promise<ReceiptModel | null> {
    const receipt = await this.receiptsRepository.findOneBy({ id, userId })

    if (!receipt) {
      this.logger.verbose(
        `Couldn't find receipt with id '${id}' for user '${userId}'`,
      )
      return null
    }

    return this.mapToDto(receipt)
  }

  async create(
    input: CreateReceiptInput,
    userId: string,
  ): Promise<ReceiptEntity> {
    const newReceipt = this.receiptsRepository.create()
    newReceipt.account = input.account
    newReceipt.store = input.store
    newReceipt.date = input.date
    newReceipt.userId = userId
    newReceipt.products = []

    for (const inputProduct of input.products) {
      const newReceiptProduct = this.receiptProductsRepository.create()

      newReceiptProduct.name = inputProduct.name
      newReceiptProduct.category = inputProduct.category
      newReceiptProduct.quantity = inputProduct.quantity
      newReceiptProduct.pricePerUnit = inputProduct.pricePerUnit
      newReceiptProduct.totalPrice = inputProduct.totalPrice

      newReceipt.products.push(newReceiptProduct)
    }

    await this.dataSource.transaction(async (em) => {
      await em.save([...newReceipt.products, newReceipt])
    })

    this.logger.verbose(`Created a new receipt with id: '${newReceipt.id}'`)

    return newReceipt
  }

  async update(
    input: UpdateReceiptInput,
    userId: string,
  ): Promise<ReceiptModel> {
    const receipt = await this.receiptsRepository.findOne({
      where: { id: input.id, userId },
      relations: {
        products: true,
      },
    })

    if (!receipt) {
      this.logger.verbose(
        `Couldn't find receipt with id '${input.id}' for user '${userId}'`,
      )
      throw new NotFoundException(
        `Couldn't find receipt with id: '${input.id}'`,
      )
    }

    const unknownProduct = input.products.find(
      (p) => p.id && receipt.products.some((op) => op.id !== p.id),
    )

    if (unknownProduct) {
      this.logger.warn(
        `receipt product with id '${unknownProduct.id}' doesn't exist`,
      )

      throw new BadRequestException(
        `Unknown receipt product id: '${unknownProduct.id}'`,
      )
    }

    receipt.store = input.store
    receipt.account = input.account
    receipt.date = input.date

    const newInputProducts = input.products.filter((p) => !p.id)

    const newProducts: ReceiptProductEntity[] = []

    for (const newInputProduct of newInputProducts) {
      const newProduct = this.receiptProductsRepository.create()
      newProduct.name = newInputProduct.name
      newProduct.category = newInputProduct.category
      newProduct.quantity = newInputProduct.quantity
      newProduct.totalPrice = newInputProduct.totalPrice
      newProduct.pricePerUnit = newInputProduct.pricePerUnit

      newProducts.push(newProduct)
    }

    receipt.products = [
      ...receipt.products.filter((p) => !!p.id),
      ...newProducts,
    ]

    await this.dataSource.transaction(async (em) => {
      await em.save([...newProducts, receipt])
    })

    this.logger.verbose(`Updated receipt with id: '${receipt.id}'`)

    return this.mapToDto(receipt)
  }

  async findReceiptProducts(receiptId: string): Promise<ReceiptProductModel[]> {
    const receiptProducts = await this.receiptProductsRepository.find({
      where: { receiptId },
    })

    return receiptProducts.map(this.mapProductToDto)
  }

  private mapToDto(receipt: ReceiptEntity): ReceiptModel {
    return {
      id: receipt.id,
      store: receipt.store,
      date: receipt.date,
      account: receipt.account,
      products: receipt.products?.map(this.mapProductToDto),
    }
  }

  private mapProductToDto(
    receiptProduct: ReceiptProductEntity,
  ): ReceiptProductModel {
    return {
      id: receiptProduct.id,
      totalPrice: receiptProduct.totalPrice,
      pricePerUnit: receiptProduct.pricePerUnit,
      quantity: receiptProduct.quantity,
      category: receiptProduct.category,
      name: receiptProduct.name,
    }
  }
}
