import { UseGuards } from '@nestjs/common'
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { CreateReceiptInput } from './dtos/createReceipt.input'
import { ReceiptModel } from './dtos/receipt.model'
import { ReceiptProductModel } from './dtos/receiptProduct.model'
import { UpdateReceiptInput } from './dtos/updateReceipt.input'
import { ReceiptsService } from './receipts.service'

@Resolver(() => ReceiptModel)
export class ReceiptsResolver {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => ReceiptModel, { name: 'receipt', nullable: true })
  async getReceipt(@Args('id', { type: () => ID }) id: string) {
    return await this.receiptsService.findById(id)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ReceiptModel)
  async createReceipt(
    @Args('createReceiptData') createReceiptData: CreateReceiptInput,
  ) {
    return await this.receiptsService.create(createReceiptData)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ReceiptModel)
  async updateReceipt(
    @Args('updateReceiptData') updateReceiptData: UpdateReceiptInput,
  ) {
    return await this.receiptsService.update(updateReceiptData)
  }

  @ResolveField('products', () => [ReceiptProductModel])
  async getReceiptProducts(@Parent() receipt: ReceiptModel) {
    if (receipt.products?.length) {
      return receipt.products
    }

    return await this.receiptsService.findReceiptProducts(receipt.id)
  }
}
