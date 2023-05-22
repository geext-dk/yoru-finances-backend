import { IsEmail, IsStrongPassword } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'The password is not strong enough. ' +
        'It should contain at least 8 characters. ' +
        'Minimum 1 lowercase character, 1 uppercase character and 1 digit',
    },
  )
  password: string
}
