import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReceiptEntity } from './entities/receipt.entity'
import { ReceiptProductEntity } from './entities/receiptProduct.entity'
import { ReceiptsResolver } from './receipts.resolver'
import { ReceiptsService } from './receipts.service'

@Module({
  imports: [TypeOrmModule.forFeature([ReceiptEntity, ReceiptProductEntity])],
  providers: [ReceiptsResolver, ReceiptsService],
})
export class ReceiptsModule {}
