import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserModel } from '../users/dtos/user.model'
import { UsersService } from '../users/users.service'
import { JwtPayload } from './jwt.payload'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(email: string, password: string): Promise<UserModel> {
    try {
      const hash = await argon2.hash(password)

      const user = await this.usersService.create(email, hash)

      return {
        id: user.id,
        email: user.email,
      }
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        `Couldn't register user with email '${email}'`,
      )
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserModel | null> {
    const user = await this.usersService.findOne(email, true)

    if (
      user?.passwordHash &&
      (await argon2.verify(user.passwordHash, password))
    ) {
      const { passwordHash: _passwordHash, ...result } = user

      return result
    }

    return null
  }

  async login(user: UserModel) {
    const payload: JwtPayload = { email: user.email, sub: user.id }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
