import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ReceiptProductEntity } from './receiptProduct.entity'

@Entity()
export class ReceiptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deletedDate?: Date

  @Column({ type: 'timestamp without time zone' })
  date: Date

  @Column()
  account: string

  @Column()
  store: string

  @OneToMany(() => ReceiptProductEntity, (product) => product.receipt)
  products: ReceiptProductEntity[]
}
