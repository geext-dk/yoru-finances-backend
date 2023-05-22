import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

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
}
