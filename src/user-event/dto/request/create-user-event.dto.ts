import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class CreateUserEventDto {
  @IsNotEmpty()
  @IsDateString()
  startDateTime: string;

  @IsNotEmpty()
  @IsDateString()
  endDateTime: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
