import axios from 'axios';
import { UserOption, ArrayOption } from '../domain/options';
import { ScrapedGroupInfo } from '../domain/scraper';

export class UniversityProgramScraper {
  private static readonly baseVuYear = 2017;
  private static readonly baseVuYearNumber = 2;

  static getAllStudyTypesOptions() {
    const OPTIONS = [{ label: 'Bakalauras', value: '1' }]; // TODO: In the future get all study types from VU;
    return OPTIONS;
  }

  static getAllSubgroupsOptions() {
    // TODO: In the future get all subgroups from VU or other source;
    const subgroupsOptions: any = [];

    for (let i = 1; i <= 10; i++) {
      subgroupsOptions.push({ label: `${i}`, value: `${i}` });
    }

    return subgroupsOptions;
  }

  static async getAllProgramsOptions(studyTypeId: number) {
    const response = await axios.get(
      `https://tvarkarasciai.vu.lt/mif/ajax_program_select_choices/${UniversityProgramScraper.getVuYearNumber()}/?study_type_id=${studyTypeId}`,
    );

    const { programs } = response.data;

    return UniversityProgramScraper.formatOptionsFrom2dArray(programs);
  }

  static async getProgramCoursesOptions(
    studyTypeId: number,
    studyProgramName: string,
  ) {
    const response = await axios.get(
      `https://tvarkarasciai.vu.lt/mif/ajax_course_select_choices/${UniversityProgramScraper.getVuYearNumber()}/?study_type_id=${studyTypeId}&study_program_name=${studyProgramName}`,
    );

    const { courses } = response.data;

    return UniversityProgramScraper.formatOptionsFrom2dArray(courses);
  }

  static async getProgramGroupsScrapingURL(
    studyTypeId: number,
    studyProgramName: string,
    courseId: number,
  ) {
    const response = await axios.get(
      `https://tvarkarasciai.vu.lt/mif/ajax_filtered_groups/${UniversityProgramScraper.getVuYearNumber()}/?study_type_id=${studyTypeId}&study_program_name=${studyProgramName}&course=${courseId}&exams=False`,
    );

    const groups: ScrapedGroupInfo[] = response.data.groups;

    return groups.map((group, index) => {
      const { url } = group;
      const urlParts = url.split('/').filter((urlPart) => urlPart);

      const { startDateTime, endDateTime } =
        UniversityProgramScraper.getAcademicYearTimeStrings();

      const baseGroupUrl = `${urlParts[urlParts.length - 1]}/group/1/`; // 1 - because for some reason it doesn't matter what number is in that url parameter
      const scrapingUrl = `https://tvarkarasciai.vu.lt/mif/ajax_fullcalendar_events/${baseGroupUrl}?start=${startDateTime}&end=${endDateTime}`;

      return {
        group: `${index + 1}`,
        calendarUrl: url,
        scrapingUrl,
      };
    });
  }

  /* EXPLANATION:
  https://tvarkarasciai.vu.lt/mif/ajax_program_select_choices/${vuYearNumber}
  every year is assigned a number internally in VU system, every year it increases +1
  2017 fall - 2018 spring (so basically the continuation of 2017 academic year) is assigned the number 2*/
  private static getVuYearNumber(): number {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const academicYearStart = currentMonth < 8 ? currentYear - 1 : currentYear;

    const yearNumber =
      UniversityProgramScraper.baseVuYearNumber +
      (academicYearStart - UniversityProgramScraper.baseVuYear);

    return yearNumber;
  }

  static formatOptionsFrom2dArray(arrayOptions: ArrayOption[]): UserOption[] {
    return arrayOptions
      .filter((arrayOption) => arrayOption[0])
      .map((arrayOption) => ({
        value: arrayOption[0].toString(),
        label: arrayOption[1].toString(),
      }));
  }

  private static getAcademicYearTimeStrings() {
    const currentYear = new Date().getFullYear();
    const YEAR_BUFFER = 2;

    return {
      startDateTime: `${currentYear - YEAR_BUFFER}-01-01`,
      endDateTime: `${currentYear + YEAR_BUFFER}-01-01`,
    };
  }
}
