import * as cheerio from 'cheerio';
import { convertToUTC } from '../helpers/time';

enum Location {
  NAUGARDUKAS = 'naugardukas',
  SALTINIAI = 'šaltiniai',
  DIDLAUKIS = 'didlaukis',
}

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
  private _dataRooms: string[] | undefined | null = undefined;
  private _room: number | undefined | null = undefined;
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
    const parsedTitle = this.$(dataTitle)?.text() || null;

    this._title = parsedTitle;

    return parsedTitle;
  }

  public get lectureTypes() {
    if (this._lectureTypes !== undefined) {
      return this._lectureTypes;
    }

    const dataShowedType = this.$('a').attr('data-showed_type');
    const innerText = this.$(dataShowedType).text();

    const parsedLectureTypes = innerText
      .split(' ')
      .slice(1)
      .map((type) => type.replace(/[^a-zA-Z]/g, '').trim());

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

    const parsedLecturer =
      this.$(this.$('a').attr('data-academics'))?.find('a')?.text()?.trim() ||
      null;

    this._lecturer = parsedLecturer;

    return parsedLecturer;
  }

  private get dataRooms() {
    if (this._dataRooms !== undefined) {
      return this._dataRooms;
    }

    const parsedDataRooms = this.$(this.$('a').attr('data-rooms'))
      ?.find('a')
      ?.text()
      ?.replace('(MIF-Šalt.)', Location.SALTINIAI)
      ?.replace('(MIF-Naug.)', Location.NAUGARDUKAS)
      ?.replace('(MIF-Didl.)', Location.DIDLAUKIS)
      ?.replace('S-', '')
      ?.split(' ');

    this._dataRooms = parsedDataRooms;

    return parsedDataRooms;
  }

  public get room() {
    if (this._room !== undefined) {
      return this._room;
    }

    const dataRooms = this.dataRooms;

    const parsedRoom = !dataRooms ? null : parseInt(dataRooms[0]) || null;

    this._room = parsedRoom;

    return parsedRoom;
  }

  public get location() {
    if (this._location !== undefined) {
      return this._location;
    }

    const dataRooms = this.dataRooms;

    const parsedLocation = !dataRooms
      ? this.$(this.$('a').attr('data-rooms'))
          ?.text()
          ?.replace('Patalpos: ', '')
          ?.trim() || null
      : dataRooms[1]?.trim() || null;

    this._location = parsedLocation;

    return parsedLocation;
  }

  public get comment() {
    if (this._comment) {
      return this._comment;
    }

    const parsedComment =
      this.$(this.$('a').attr('data-comments'))
        ?.text()
        ?.replace('Komentarai: ', '')
        ?.trim() || null;

    this._comment = parsedComment;

    return parsedComment;
  }

  public get subgroup() {
    if (this._subgroup !== undefined) {
      return this._subgroup;
    }

    const parsedSubgroup =
      this.$(this.$('a').attr('data-subgroups'))
        ?.text()
        ?.replace('Pogrupiai: ', '')
        ?.trim() || null;

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
      room: this.room,
      location: this.location,
      comment: this.comment,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
    };
  }
}
