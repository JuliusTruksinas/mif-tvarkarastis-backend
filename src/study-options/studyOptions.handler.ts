import { UniversityProgramScraper } from '../scrapers/UniversityProgramScraper';
import { ResponseStatus } from '../constants/responseStatus';
import { catchAsync } from '../utils/catchAsync';
import { GetProgramsOptionsDto } from './dto/request/get-programs-options.dto';
import { GetCoursesOptionsDto } from './dto/request/get-courses-options.dto';
import { GetGroupsOptionsDto } from './dto/request/get-groups-options.dto';

export const getAllStudyTypesOptions = (req, res, next) => {
  const allStudyTypesOptions =
    UniversityProgramScraper.getAllStudyTypesOptions();

  res.json({
    status: ResponseStatus.SUCCESS,
    data: allStudyTypesOptions,
  });
};

export const getAllProgramsOptions = catchAsync(async (req, res, next) => {
  const { studyType }: GetProgramsOptionsDto = req.body;

  const allProgramsOptions =
    await UniversityProgramScraper.getAllProgramsOptions(studyType);

  res.json({
    status: ResponseStatus.SUCCESS,
    data: allProgramsOptions,
  });
});

export const getAllCoursesOptions = catchAsync(async (req, res, next) => {
  const { studyType, studyProgramName }: GetCoursesOptionsDto = req.body;

  const allCoursesOptions =
    await UniversityProgramScraper.getProgramCoursesOptions(
      studyType,
      studyProgramName,
    );

  res.json({
    status: ResponseStatus.SUCCESS,
    data: allCoursesOptions,
  });
});

export const getAllGroupsOptions = catchAsync(async (req, res, next) => {
  const { studyType, studyProgramName, course }: GetGroupsOptionsDto = req.body;

  const groupsScrapingUrl =
    await UniversityProgramScraper.getProgramGroupsScrapingURL(
      studyType,
      studyProgramName,
      course,
    );

  const groupsOptions = groupsScrapingUrl.map((groupScrapingUrl) => ({
    label: groupScrapingUrl.group,
    value: groupScrapingUrl.group,
  }));

  res.json({
    status: ResponseStatus.SUCCESS,
    data: groupsOptions,
  });
});

export const getAllSubgroupsOptions = (req, res, next) => {
  const allSubgroupsOptions = UniversityProgramScraper.getAllSubgroupsOptions();

  res.json({
    status: ResponseStatus.SUCCESS,
    data: allSubgroupsOptions,
  });
};
