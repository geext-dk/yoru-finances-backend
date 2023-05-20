import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Receipt } from './models/receipt.model'
import { ReceiptProduct } from './models/receiptProduct.model'

@Resolver(() => Receipt)
export class ReceiptsResolver {
  @Query(() => Receipt, { name: 'receipt' })
  async getReceipt(@Args('id', { type: () => ID }) id: string) {
    const receipt: Receipt = {
      id: '00000000-0000-0000-0000-000000000000',
      store: 'Voli',
      date: new Date(),
      account: 'Wise',
      products: [],
    }

    return receipt
  }

  @ResolveField('products', () => [ReceiptProduct])
  getReceiptProducts(@Parent() receipt: Receipt) {
    return [
      {
        id: '00000000-0000-0000-0000-000000000000',
        name: 'Product name',
        pricePerUnit: 1.23,
        category: 'Test Category',
        quantity: 1,
        totalPrice: 1.23,
      },
    ]
  }
}
