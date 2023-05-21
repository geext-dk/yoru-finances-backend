import { Module } from '@nestjs/common'
import { ReceiptsResolver } from './receipts.resolver'
import { ReceiptsService } from './receipts.service'

@Module({
  providers: [ReceiptsResolver, ReceiptsService],
})
export class ReceiptsModule {}
