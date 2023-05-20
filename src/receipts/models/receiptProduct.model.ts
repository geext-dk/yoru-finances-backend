import { Field, Float, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ReceiptProduct {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  category: string

  @Field(() => Float)
  pricePerUnit: number

  @Field(() => Float)
  quantity: number

  @Field(() => Float)
  totalPrice: number
}
