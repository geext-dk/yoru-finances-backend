import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ReceiptEntity } from './receipt.entity'

@Entity()
export class ReceiptProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deletedDate?: Date

  @Column()
  name: string

  @Column()
  category: string

  @Column({ type: 'integer' })
  pricePerUnit: number

  @Column({ type: 'real' })
  quantity: number

  @Column({ type: 'integer' })
  totalPrice: number

  @Column()
  receiptId: string

  @ManyToOne(() => ReceiptEntity, (receipt) => receipt.products)
  receipt: ReceiptEntity
}
