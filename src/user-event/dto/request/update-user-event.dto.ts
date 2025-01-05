import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  RepeatableUserEventUpdateEnum,
  RepeatableUserEventUpdateType,
} from '../../userEvent.types';

export class UpdateUserEventDto {
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

  @IsOptional()
  @IsEnum(RepeatableUserEventUpdateEnum)
  repeatableUserEventUpdateType:
    | RepeatableUserEventUpdateType
    | null
    | undefined;
}
