import { InputType, OmitType } from '@nestjs/graphql'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, ValidateNested } from 'class-validator'
import { ReceiptModel } from './receipt.model'
import { ReceiptProductModel } from './receiptProduct.model'

@InputType()
export class CreateReceiptInput extends OmitType(
  ReceiptModel,
  ['id', 'products'] as const,
  InputType,
) {
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateReceiptProductInput)
  products: CreateReceiptProductInput[]
}

@InputType()
export class CreateReceiptProductInput extends OmitType(
  ReceiptProductModel,
  ['id'] as const,
  InputType,
) {}
