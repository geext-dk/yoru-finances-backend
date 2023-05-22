import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ReceiptEntity } from '../../receipts/entities/receipt.entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  passwordHash: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deletedDate?: Date

  @OneToMany(() => ReceiptEntity, (receipt) => receipt.user)
  receipts: ReceiptEntity[]
}
