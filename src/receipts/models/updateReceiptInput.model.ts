import { Field, Float, GraphQLISODateTime, ID, InputType } from "@nestjs/graphql";


@InputType()
export class UpdateReceiptInput {
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  date: Date

  @Field()
  account: string

  @Field()
  store: string

  @Field(() => [UpdateReceiptProductInput])
  products: UpdateReceiptProductInput[]
}


@InputType()
export class UpdateReceiptProductInput {
  @Field(() => ID, { nullable: true })
  id?: string

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
