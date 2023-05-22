import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  validate(email: string, password: string): Promise<unknown> {
    const user = this.authService.validateUser(email, password)

    if (!user) {
      throw new UnauthorizedException(
        `Failed to validate user password for: '${email}'`,
      )
    }

    return user
  }
}
