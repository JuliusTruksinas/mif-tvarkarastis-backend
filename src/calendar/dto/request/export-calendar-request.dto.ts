import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ExportCalendarRequestDto {
  @IsNotEmpty()
  @IsDateString()
  fromDate: string;

  @IsNotEmpty()
  @IsDateString()
  toDate: string;

  @IsNotEmpty()
  @IsBoolean()
  areUserEventsIncluded: boolean;

  @IsNotEmpty()
  @IsBoolean()
  areHiddenLecturesExcluded: boolean;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
