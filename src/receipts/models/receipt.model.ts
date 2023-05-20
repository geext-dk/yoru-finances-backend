import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { ReceiptProduct } from './receiptProduct.model'

@ObjectType()
export class Receipt {
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  date: Date

  account: string

  store: string

  @Field(() => [ReceiptProduct])
  products: ReceiptProduct[]
}
