import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  resetPasswordToken: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  repeatedPassword: string;
}
