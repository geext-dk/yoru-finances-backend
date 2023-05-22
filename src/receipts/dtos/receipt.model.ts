import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  ArrayNotEmpty,
  IsDate,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { ReceiptProductModel } from './receipt-product.model'

@ObjectType()
export class ReceiptModel {
  @Field(() => ID)
  @IsUUID()
  id: string

  @IsDate()
  date: Date

  @MinLength(1)
  account: string

  @MinLength(1)
  store: string

  @ArrayNotEmpty()
  @ValidateNested()
  products: ReceiptProductModel[]
}
