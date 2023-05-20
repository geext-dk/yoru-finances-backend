import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { ReceiptProduct } from './receiptProduct.model'

@ObjectType()
export class Receipt {
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  date: Date

  @Field()
  account: string

  @Field()
  store: string

  @Field(() => [ReceiptProduct])
  products: ReceiptProduct[]
}
