// import { AppRequest } from '../domain/appRequest';
// import { LectureEvent } from '../lecture-event/lectureEvent.model';
// import { LectureParser } from '../scrapers/lectureParser';
// import { UniversityProgramScraper } from '../scrapers/UniversityProgramScraper';
// import { catchAsync } from '../utils/catchAsync';

// interface GroupData {
//   group: string;
//   calendarUrl: string;
//   scrapingUrl: string;
// }

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// const updateLectures = async (
//   groupData: GroupData,
//   programName: string,
//   course: number,
// ) => {
//   const response = await fetch(groupData.scrapingUrl);
//   const { events } = await response.json();

//   for (const event of events) {
//     const parsedLecture = new LectureParser(
//       event,
//       programName,
//       course,
//       +groupData.group,
//     );

//     try {
//       await LectureEvent.create(parsedLecture.getAllData());
//     } catch (err) {}
//   }
// };

// export const updateLecturesHandler = catchAsync(
//   async (req: AppRequest, res, next) => {
//     await LectureEvent.deleteMany({});

//     const programOptions = await UniversityProgramScraper.getAllProgramsOptions(
//       1,
//     );

//     for (const programOption of programOptions) {
//       const courseOptions =
//         await UniversityProgramScraper.getProgramCoursesOptions(
//           1,
//           programOption.value,
//         );

//       for (const courseOption of courseOptions) {
//         const groupsData: GroupData[] =
//           await UniversityProgramScraper.getProgramGroupsScrapingURL(
//             1,
//             programOption.value,
//             +courseOption.value,
//           );

//         for (const groupData of groupsData) {
//           await delay(500);
//           await updateLectures(
//             groupData,
//             programOption.value,
//             +courseOption.value,
//           );
//         }
//       }
//     }

//     res.json({
//       status: 'success',
//       data: null,
//     });
//   },
// );
