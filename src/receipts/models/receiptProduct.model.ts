import { Field, Float, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ReceiptProductModel {
  @Field(() => ID)
  id: string
  name: string
  category: string

  @Field(() => Float)
  pricePerUnit: number

  @Field(() => Float)
  quantity: number

  @Field(() => Float)
  totalPrice: number
}
