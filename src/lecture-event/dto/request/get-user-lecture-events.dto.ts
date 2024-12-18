import { IsDateString, IsNotEmpty } from 'class-validator';

export class GetUserLectureEventsRequestDto {
  @IsNotEmpty()
  @IsDateString()
  startDateTime: string;

  @IsNotEmpty()
  @IsDateString()
  endDateTime: string;
}
