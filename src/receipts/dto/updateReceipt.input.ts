import {
  InputType,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, ValidateNested } from 'class-validator'
import { ReceiptModel } from './receipt.model'
import { ReceiptProductModel } from './receiptProduct.model'

@InputType()
export class UpdateReceiptInput extends OmitType(
  ReceiptModel,
  ['products'] as const,
  InputType,
) {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => UpdateReceiptProductInput)
  products: UpdateReceiptProductInput[]
}

@InputType()
export class UpdateReceiptProductInput extends IntersectionType(
  OmitType(ReceiptProductModel, ['id'] as const, InputType),
  PartialType(PickType(ReceiptProductModel, ['id'] as const, InputType)),
) {}
