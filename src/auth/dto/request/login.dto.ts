import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { errorMessages } from '../../../constants/errorMessages';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: errorMessages.invalidEmail })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: errorMessages.minStringLength
      .replace(':property', 'Password')
      .replace(':value', '6'),
  })
  password: string;
}
