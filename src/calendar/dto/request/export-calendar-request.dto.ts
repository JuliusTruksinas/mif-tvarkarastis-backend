import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

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
  areSelectableLecturesIncluded: boolean;
}
