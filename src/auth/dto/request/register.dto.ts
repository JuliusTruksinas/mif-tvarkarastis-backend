import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { errorMessages } from '../../../constants/errorMessages';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: errorMessages.invalidEmail })
  @MaxLength(100, {
    message: errorMessages.maxStringLength
      .replace(':property', 'Email')
      .replace(':value', '100'),
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: errorMessages.minStringLength
      .replace(':property', 'Password')
      .replace(':value', '6'),
  })
  @MaxLength(100, {
    message: errorMessages.maxStringLength
      .replace(':property', 'Password')
      .replace(':value', '100'),
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: errorMessages.maxStringLength
      .replace(':property', 'Program name')
      .replace(':value', '100'),
  })
  programName: string;

  @IsNotEmpty()
  @IsNumber()
  group: number;

  @IsNotEmpty()
  @IsNumber()
  subGroup: number;
}
