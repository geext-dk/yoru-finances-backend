import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import * as crypto from 'crypto'
import { ReceiptProductModel } from './dto/receiptProduct.model'
import { ReceiptModel } from './dto/receipt.model'

export type CreateReceiptModel = Omit<ReceiptModel, 'id' | 'products'> & {
  products: Omit<ReceiptProductModel, 'id'>[]
}

export type UpdateReceiptModel = Omit<ReceiptModel, 'products'> & {
  products: (Omit<ReceiptProductModel, 'id'> &
    Partial<Pick<ReceiptProductModel, 'id'>>)[]
}

@Injectable()
export class ReceiptsService {
  private receipts: ReceiptModel[] = []

  async findById(id: string): Promise<ReceiptModel | undefined> {
    let receipt = this.receipts.find((r) => r.id === id)

    if (receipt) {
      receipt = {
        ...receipt,
        products: [],
      }
    }

    return receipt
  }

  async create(createReceiptModel: CreateReceiptModel): Promise<ReceiptModel> {
    const newReceipt: ReceiptModel = {
      ...createReceiptModel,
      id: crypto.randomUUID(),
      products: createReceiptModel.products.map((p) => ({
        ...p,
        id: crypto.randomUUID(),
      })),
    }

    this.receipts.push(newReceipt)

    return newReceipt
  }

  async update(updateReceiptModel: UpdateReceiptModel): Promise<ReceiptModel> {
    const oldIndex = this.receipts.findIndex(
      (r) => r.id === updateReceiptModel.id,
    )

    if (oldIndex < 0) {
      throw new NotFoundException(
        `Couldn't find receipt with id: '${updateReceiptModel.id}'`,
      )
    }

    const oldReceipt = this.receipts[oldIndex]

    const unknownProduct = updateReceiptModel.products.find(
      (p) => p.id && oldReceipt.products.some((op) => op.id !== p.id),
    )

    if (unknownProduct) {
      throw new BadRequestException(
        `Unknown receipt product id: '${unknownProduct.id}'`,
      )
    }

    const newReceipt: ReceiptModel = {
      ...updateReceiptModel,
      products: updateReceiptModel.products.map((p) => ({
        ...p,
        id: p.id || crypto.randomUUID(),
      })),
    }

    this.receipts.splice(oldIndex, 1, newReceipt)

    return newReceipt
  }

  async findAll() {
    return this.receipts
  }

  async getReceiptProducts(receiptId: string) {
    const entityReceipt = this.receipts.find((r) => r.id === receiptId)

    if (!entityReceipt) {
      throw new NotFoundException(
        `Couldn't find receipt with id: '${receiptId}'`,
      )
    }

    return entityReceipt.products
  }
}
