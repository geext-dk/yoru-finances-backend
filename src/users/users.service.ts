import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserModel } from './dtos/user.model'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(
    email: string,
    withPasswordHash: boolean,
  ): Promise<UserModel | null> {
    const user = await this.usersRepository.findOneBy({ email })

    if (!user) {
      return null
    }

    return {
      email: user.email,
      id: user.id,
      passwordHash: withPasswordHash ? user.passwordHash : undefined,
    }
  }

  async create(email: string, passwordHash: string): Promise<UserModel> {
    const user = await this.usersRepository.create()
    user.email = email
    user.passwordHash = passwordHash

    await this.usersRepository.save(user)

    return {
      email: user.email,
      id: user.id,
    }
  }
}
