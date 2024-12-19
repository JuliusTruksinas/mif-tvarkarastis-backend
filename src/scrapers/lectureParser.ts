import * as cheerio from 'cheerio';
import { convertToUTC } from '../helpers/time';

// TODO: add types
export class LectureParser {
  // internal properties
  public event: any;
  private readonly $: cheerio.CheerioAPI;
  private static readonly _timeZone = 'Europe/Vilnius';

  // properties that don't need to be computed
  private readonly _programName: string;
  private readonly _course: number;
  private readonly _group: number;

  // properties that need to be computed
  private _title: string | undefined | null = undefined;
  private _lectureTypes: string[] | undefined | null = undefined;
  private _lecturer: string | undefined | null = undefined;
  private _location: string | undefined | null = undefined;
  private _comment: string | undefined | null = undefined;
  private _subgroup: string | undefined | null = undefined;

  constructor(event: any, programName: string, course: number, group: number) {
    this.event = event;
    this.$ = cheerio.load(event.title);

    this._programName = programName;
    this._course = course;
    this._group = group;
  }

  public get title() {
    if (this._title !== undefined) {
      return this._title;
    }

    const dataTitle = this.$('a').attr('data-title');
    const parsedTitle = this.$(dataTitle)?.text()?.trim() || null;

    this._title = parsedTitle;

    return parsedTitle;
  }

  public get lectureTypes() {
    if (this._lectureTypes !== undefined) {
      return this._lectureTypes;
    }

    const dataShowedType = this.$('a').attr('data-showed_type');
    const innerText = this.$(dataShowedType).text()?.trim();

    const parsedLectureTypes = innerText
      .split(' ')
      .slice(1)
      .filter((type) => type.trim().length > 2)
      .map((type) =>
        type
          .toLowerCase()
          .replace(/[^a-zA-Z]/g, '')
          .trim(),
      );

    this._lectureTypes = parsedLectureTypes;

    return parsedLectureTypes;
  }

  public get group() {
    return this._group;
  }

  public get lecturer() {
    if (this._lecturer !== undefined) {
      return this._lecturer;
    }

    const dataAcademics = this.$('a').attr('data-academics');
    const parsedLecturer = this.$(dataAcademics)?.text()?.trim() || null;

    this._lecturer = parsedLecturer;

    return parsedLecturer;
  }

  public get location() {
    if (this._location !== undefined) {
      return this._location;
    }
    const dataRooms = this.$(this.$('a').attr('data-rooms'));

    const parsedLocation =
      this.$(dataRooms)?.text()?.replace('Patalpos: ', '')?.trim() || null;

    this._location = parsedLocation;

    return parsedLocation;
  }

  public get comment() {
    if (this._comment) {
      return this._comment;
    }

    const dataComments = this.$('a').attr('data-comments');

    const parsedComment =
      this.$(dataComments)?.text()?.replace('Komentarai: ', '')?.trim() || null;

    this._comment = parsedComment;

    return parsedComment;
  }

  public get subgroup() {
    if (this._subgroup !== undefined) {
      return this._subgroup;
    }

    const dataSubgroup = this.$('a').attr('data-subgroups');

    const parsedSubgroup =
      this.$(dataSubgroup)?.text()?.replace('Pogrupiai: ', '')?.trim() || null;

    this._subgroup = parsedSubgroup;

    return parsedSubgroup;
  }

  public get startDateTime(): string | null {
    if (!this?.event?.start) {
      return null;
    }

    return convertToUTC(this?.event?.start, LectureParser._timeZone);
  }

  public get endDateTime(): string | null {
    if (!this?.event?.end) {
      return null;
    }

    return convertToUTC(this?.event?.end, LectureParser._timeZone);
  }

  public get programName() {
    return this._programName;
  }

  public get course() {
    return this._course;
  }

  public getAllData() {
    return {
      programName: this.programName,
      course: this.course,
      group: this.group,
      subgroup: this.subgroup,
      title: this.title,
      lectureTypes: this.lectureTypes,
      lecturer: this.lecturer,
      location: this.location,
      comment: this.comment,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
    };
  }
}
