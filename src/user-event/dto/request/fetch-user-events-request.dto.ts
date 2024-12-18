import { IsDateString, IsNotEmpty } from 'class-validator';

export class FetchUserEventsRequestDto {
  @IsNotEmpty()
  @IsDateString()
  startDateTime: string;

  @IsNotEmpty()
  @IsDateString()
  endDateTime: string;
}
