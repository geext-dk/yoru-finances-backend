import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from '../../users/entities/user.entity'
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

  @Column()
  userId: string

  @ManyToOne(() => UserEntity, (user) => user.receipts)
  user: UserEntity
}
