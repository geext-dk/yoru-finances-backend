import { Field, Float, GraphQLISODateTime, InputType } from "@nestjs/graphql";

@InputType()
export class CreateReceiptInput {
  @Field(() => GraphQLISODateTime)
  date: Date

  @Field()
  account: string

  @Field()
  store: string

  @Field(() => [CreateReceiptProductDto])
  products: CreateReceiptProductDto[]
}

@InputType()
export class CreateReceiptProductDto {
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
