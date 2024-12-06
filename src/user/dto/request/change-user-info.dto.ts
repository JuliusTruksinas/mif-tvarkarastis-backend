import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ChangeUserInfoDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  programName?: string;

  @IsOptional()
  @IsNumber()
  course?: number;

  @IsOptional()
  @IsNumber()
  group?: number;

  @IsOptional()
  @IsNumber()
  subgroup?: number;
}
