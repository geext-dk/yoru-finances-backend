import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql'
import { Min, MinLength } from 'class-validator'

@ObjectType()
export class ReceiptProductModel {
  @Field(() => ID)
  id: string

  @MinLength(1)
  name: string

  @MinLength(1)
  category: string

  @Field(() => Int)
  @Min(0)
  pricePerUnit: number

  @Field(() => Float)
  @Min(0)
  quantity: number

  @Field(() => Int)
  @Min(0)
  totalPrice: number
}
