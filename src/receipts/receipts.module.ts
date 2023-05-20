import { Module } from '@nestjs/common'
import { ReceiptsResolver } from './receipts.resolver'

@Module({
  providers: [ReceiptsResolver],
})
export class ReceiptsModule {}
