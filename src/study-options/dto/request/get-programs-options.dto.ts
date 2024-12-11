import { IsNumber, Max, Min } from 'class-validator';

export class GetProgramsOptionsDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  studyType: number;
}
