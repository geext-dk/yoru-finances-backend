import { Field, ID, ObjectType } from '@nestjs/graphql'
import { ReceiptProductModel } from './receiptProduct.model'

@ObjectType()
export class ReceiptModel {
  @Field(() => ID)
  id: string
  date: Date
  account: string
  store: string
  products: ReceiptProductModel[]
}
