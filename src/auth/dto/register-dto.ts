import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(100, { message: 'Why the fck do you have such a long email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(100, { message: 'password cannot be longer than 100 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'Program name should not be longer than 100 characters',
  })
  programName: string;

  @IsNotEmpty()
  @IsNumber()
  group: number;

  @IsNotEmpty()
  @IsNumber()
  subGroup: number;
}
