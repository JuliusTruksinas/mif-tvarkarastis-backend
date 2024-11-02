import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { errorMessages } from '../../../constants/errorMessages';

export class ChangeUserInfoDto {
  @IsOptional()
  @IsString()
  @IsEmail({}, { message: errorMessages.invalidEmail })
  @MaxLength(100, {
    message: errorMessages.maxStringLength
      .replace(':property', 'Email')
      .replace(':value', '100'),
  })
  email?: string;

  @IsOptional()
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
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: errorMessages.maxStringLength
      .replace(':property', 'Program name')
      .replace(':value', '100'),
  })
  programName?: string;

  @IsOptional()
  @IsNumber()
  group?: number;

  @IsOptional()
  @IsNumber()
  subGroup?: number;
}
