import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  studyType: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  programName: string;

  @IsNotEmpty()
  @IsNumber()
  course: number;

  @IsNotEmpty()
  @IsNumber()
  group: number;

  @IsNotEmpty()
  @IsNumber()
  subgroup: number;

  @IsOptional()
  @IsString()
  profilePhotoUrl: string;
}
