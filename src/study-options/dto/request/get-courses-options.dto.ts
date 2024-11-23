import { IsString, MaxLength, MinLength } from 'class-validator';
import { GetProgramsOptionsDto } from './get-programs-options.dto';

export class GetCoursesOptionsDto extends GetProgramsOptionsDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  studyProgramName: string;
}
