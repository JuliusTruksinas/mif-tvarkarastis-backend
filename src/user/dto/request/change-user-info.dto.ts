import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class ChangeUserInfoDto {
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

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password?: string;

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
  @Min(1)
  @Max(2)
  subgroup: number;

  @IsNotEmpty()
  @IsString()
  preferredNavigationApp: string;

  @IsOptional()
  @IsString()
  profilePhotoUrl?: string | null;
}
