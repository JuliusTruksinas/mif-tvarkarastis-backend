import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ChangeUserInfoDto {
  @IsOptional()
  @IsString()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100, { message: 'Why the fck do you have such a long email' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'password cannot be longer than 100 characters' })
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Program name should not be longer than 100 characters',
  })
  programName?: string;

  @IsOptional()
  @IsNumber()
  group?: number;

  @IsOptional()
  @IsNumber()
  subGroup?: number;
}
