import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class GetUserLectureEventsRequestDto {
  @IsNotEmpty()
  @IsDateString()
  startDateTime: string;

  @IsNotEmpty()
  @IsDateString()
  endDateTime: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
