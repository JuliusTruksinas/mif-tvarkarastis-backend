import { LectureEvent } from '../lecture-event/lectureEvent.model';
import { LectureParser } from '../scrapers/lectureParser';
import { UniversityProgramScraper } from '../scrapers/UniversityProgramScraper';
import { catchAsync } from '../utils/catchAsync';

interface GroupData {
  group: string;
  calendarUrl: string;
  scrapingUrl: string;
}

const isLectureAlreadySaved = async (
  lectureData: ReturnType<LectureParser['getAllData']>,
) => {
  const { startDateTime, endDateTime, title, programName, course, groups } =
    lectureData;

  const existingLecture = await LectureEvent.findOne({
    startDateTime,
    endDateTime,
    title,
    programName,
    course,
    groups: { $all: groups },
  });

  return existingLecture !== null;
};

const updateLectures = async (
  groupData: GroupData,
  programName: string,
  course: number,
) => {
  const response = await fetch(groupData.scrapingUrl);
  const { events } = await response.json();

  for (const event of events) {
    const parsedLecture = new LectureParser(event, programName, course);

    if (parsedLecture.title && parsedLecture.title.includes('atostogos')) {
      continue;
    }

    if (parsedLecture.groups && parsedLecture.groups.length === 1) {
      await LectureEvent.create(parsedLecture.getAllData());
      continue;
    }

    if (await isLectureAlreadySaved(parsedLecture.getAllData())) {
      continue;
    }

    await LectureEvent.create(parsedLecture.getAllData());
  }
};

export const updateLecturesHandler = catchAsync(async (req, res, next) => {
  await LectureEvent.deleteMany({});

  const programOptions = await UniversityProgramScraper.getAllProgramsOptions(
    1,
  );

  // TODO: in the future don't filter only by one programName, add more
  const filteredProgramOptions = programOptions.filter(
    (programOption) =>
      programOption.value === 'Informacinių sistemų inžinerija',
  );

  for (const programOption of filteredProgramOptions) {
    const courseOptions =
      await UniversityProgramScraper.getProgramCoursesOptions(
        1,
        programOption.value,
      );

    for (const courseOption of courseOptions) {
      const groupsData: GroupData[] =
        await UniversityProgramScraper.getProgramGroupsScrapingURL(
          1,
          programOption.value,
          +courseOption.value,
        );

      for (const groupData of groupsData) {
        await updateLectures(
          groupData,
          programOption.value,
          +courseOption.value,
        );
      }
    }
  }

  res.json({
    status: 'success',
    data: null,
  });
});
