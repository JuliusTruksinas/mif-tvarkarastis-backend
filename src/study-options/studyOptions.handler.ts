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
    status: ResponseStatus.SUCESS,
    data: allStudyTypesOptions,
  });
};

export const getAllProgramsOptions = catchAsync(async (req, res, next) => {
  const { studyTypeId }: GetProgramsOptionsDto = req.body;

  const allProgramsOptions =
    await UniversityProgramScraper.getAllProgramsOptions(studyTypeId);

  res.json({
    status: ResponseStatus.SUCESS,
    data: allProgramsOptions,
  });
});

export const getAllCoursesOptions = catchAsync(async (req, res, next) => {
  const { studyTypeId, studyProgramName }: GetCoursesOptionsDto = req.body;

  const allCoursesOptions =
    await UniversityProgramScraper.getProgramCoursesOptions(
      studyTypeId,
      studyProgramName,
    );

  res.json({
    status: ResponseStatus.SUCESS,
    data: allCoursesOptions,
  });
});

export const getAllGroupsOptions = catchAsync(async (req, res, next) => {
  const { studyTypeId, studyProgramName, course }: GetGroupsOptionsDto =
    req.body;

  const groupsScrapingUrl =
    await UniversityProgramScraper.getProgramGroupsScrapingURL(
      studyTypeId,
      studyProgramName,
      course,
    );

  const groupsOptions = groupsScrapingUrl.map((groupScrapingUrl) => ({
    label: groupScrapingUrl.group,
    value: groupScrapingUrl.group,
  }));

  res.json({
    status: ResponseStatus.SUCESS,
    data: groupsOptions,
  });
});

export const getAllSubgroupsOptions = (req, res, next) => {
  const allSubgroupsOptions = UniversityProgramScraper.getAllSubgroupsOptions();

  res.json({
    status: ResponseStatus.SUCESS,
    data: allSubgroupsOptions,
  });
};
