import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RemindPasswordRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
