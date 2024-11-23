import { IsNumber, Max, Min } from 'class-validator';
import { GetCoursesOptionsDto } from './get-courses-options.dto';

export class GetGroupsOptionsDto extends GetCoursesOptionsDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  course: number;
}
