import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common'
import { Request } from 'express'
import { UserModel } from '../users/dtos/user.model'
import { AuthService } from './auth.service'
import { RegisterDto } from './dtos/register.dto'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as UserModel)
  }

  @Post('register')
  async register(@Body() registerUser: RegisterDto) {
    return this.authService.registerUser(
      registerUser.email,
      registerUser.password,
    )
  }
}
