import { BadRequestException, NotFoundException } from "@nestjs/common";
import {
  Args,
  ID, Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from "@nestjs/graphql";
import * as crypto from "crypto";
import { CreateReceiptInput } from "./models/createReceiptInput.model";
import { Receipt } from './models/receipt.model'
import { ReceiptProduct } from './models/receiptProduct.model'
import { UpdateReceiptInput } from "./models/updateReceiptInput.model";

@Resolver(() => Receipt)
export class ReceiptsResolver {
  receipts: Receipt[] = []

  @Query(() => Receipt, { name: 'receipt', nullable: true })
  async getReceipt(@Args('id', { type: () => ID }) id: string) {
    const receipt = this.receipts.find(r => r.id === id)
    if (!receipt) {
      return undefined
    }

    const receiptCopy: Receipt = {
      ...receipt,
      products: []
    }

    return receiptCopy
  }

  @Mutation(() => Receipt)
  async createReceipt(@Args("createReceiptData") createReceiptData: CreateReceiptInput) {
    const receipt: Receipt = {
      ...createReceiptData,
      id: crypto.randomUUID(),
      products: createReceiptData.products.map(p => ({
        ...p,
        id: crypto.randomUUID()
      }))
    }

    this.receipts.push(receipt)

    return receipt
  }

  @Mutation(() => Receipt)
  async updateReceipt(@Args("updateReceiptData") updateReceiptData: UpdateReceiptInput) {
    const oldIndex = this.receipts.findIndex(r => r.id === updateReceiptData.id)
    if (oldIndex < 0) {
      throw new NotFoundException(`Couldn't find receipt with id: '${updateReceiptData.id}'`)
    }

    const oldReceipt = this.receipts[oldIndex]

    const unknownProduct = updateReceiptData.products.find(p => p.id && oldReceipt.products.some(op => op.id !== p.id))

    if (unknownProduct) {
      throw new BadRequestException(`Unknown receipt product id: '${unknownProduct.id}'`)
    }

    const newReceipt: Receipt = {
      ...updateReceiptData,
      products: updateReceiptData.products.map(p => ({
        ...p,
        id: p.id || crypto.randomUUID()
      }))
    }


    this.receipts.splice(oldIndex, 1, newReceipt)

    return newReceipt
  }

  @ResolveField('products', () => [ReceiptProduct])
  getReceiptProducts(@Parent() receipt: Receipt) {
    const entityReceipt = this.receipts.find(r => r.id === receipt.id)

    return entityReceipt?.products || []
  }
}
