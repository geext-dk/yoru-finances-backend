import { InputType, OmitType } from '@nestjs/graphql'
import { ReceiptModel } from './receipt.model'
import { ReceiptProductModel } from './receiptProduct.model'

@InputType()
export class CreateReceiptInput extends OmitType(
  ReceiptModel,
  ['id', 'products'] as const,
  InputType,
) {
  products: CreateReceiptProductInput[]
}

@InputType()
export class CreateReceiptProductInput extends OmitType(
  ReceiptProductModel,
  ['id'] as const,
  InputType,
) {}
