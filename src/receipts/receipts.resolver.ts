import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { CreateReceiptInput } from './dto/createReceipt.input'
import { ReceiptModel } from './dto/receipt.model'
import { ReceiptProductModel } from './dto/receiptProduct.model'
import { UpdateReceiptInput } from './dto/updateReceipt.input'
import { ReceiptsService } from './receipts.service'

@Resolver(() => ReceiptModel)
export class ReceiptsResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Query(() => ReceiptModel, { name: 'receipt', nullable: true })
  async getReceipt(@Args('id', { type: () => ID }) id: string) {
    return await this.receiptsService.findById(id)
  }

  @Mutation(() => ReceiptModel)
  async createReceipt(
    @Args('createReceiptData') createReceiptData: CreateReceiptInput,
  ) {
    return await this.receiptsService.create(createReceiptData)
  }

  @Mutation(() => ReceiptModel)
  async updateReceipt(
    @Args('updateReceiptData') updateReceiptData: UpdateReceiptInput,
  ) {
    return await this.receiptsService.update(updateReceiptData)
  }

  @ResolveField('products', () => [ReceiptProductModel])
  getReceiptProducts(@Parent() receipt: ReceiptModel) {
    return this.receiptsService.getReceiptProducts(receipt.id)
  }
}
