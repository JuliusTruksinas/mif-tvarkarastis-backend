import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum OccurrenceTypeEnum {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export type OccurrenceType = 'day' | 'week' | 'month';

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

  @IsNotEmpty()
  @IsBoolean()
  isPrivate: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isRepeatable: boolean;

  @IsOptional()
  @IsEnum(OccurrenceTypeEnum)
  occurrenceType: OccurrenceType;

  @IsOptional()
  @IsDateString()
  repeatableUntil: string;
}
