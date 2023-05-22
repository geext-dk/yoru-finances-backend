import { Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserModel } from '../users/dtos/user.model'
import authConfig from './config/auth.config'
import { JwtPayload } from './jwt.payload'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    })
  }

  validate(payload: JwtPayload): UserModel {
    return {
      id: payload.sub,
      email: payload.email,
    }
  }
}
