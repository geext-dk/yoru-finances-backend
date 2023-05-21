import { Field, ID, InputType, OmitType } from '@nestjs/graphql'
import { ReceiptModel } from './receipt.model'
import { ReceiptProductModel } from './receiptProduct.model'

@InputType()
export class UpdateReceiptInput extends OmitType(
  ReceiptModel,
  ['products'] as const,
  InputType,
) {
  products: UpdateReceiptProductInput[]
}

@InputType()
export class UpdateReceiptProductInput extends OmitType(
  ReceiptProductModel,
  ['id'] as const,
  InputType,
) {
  @Field(() => ID)
  id?: string
}
