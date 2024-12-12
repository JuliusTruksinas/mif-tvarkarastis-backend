import * as cheerio from 'cheerio';

enum Location {
  NAUGARDUKAS = 'naugardukas',
  SALTINIAI = 'šaltiniai',
  DIDLAUKIS = 'didlaukis',
}

// TODO: add types
export class LectureParser {
  public event: any;
  private $: cheerio.CheerioAPI;

  private _programName: string;
  private _course: number;

  // properties that need to be computed
  private _title: string | undefined | null = undefined;
  private _lectureTypes: string[] | undefined | null = undefined;
  private _groups: number[] | undefined | null = undefined;
  private _lecturer: string | undefined | null = undefined;
  private _dataRooms: string[] | undefined | null = undefined;
  private _room: number | undefined | null = undefined;
  private _location: string | undefined | null = undefined;
  private _comment: string | undefined | null = undefined;
  private _subgroup: string | undefined | null = undefined;

  constructor(event: any, programName: string, course: number) {
    this.event = event;
    this.$ = cheerio.load(event.title);

    this._programName = programName;
    this._course = course;
  }

  public get title() {
    if (this._title !== undefined) {
      return this._title;
    }

    const parsedTitle: string | null =
      this.$(this.$('a').attr('data-title'))?.find('a')?.text() ||
      this.event?.title?.trim() ||
      null;

    this._title = parsedTitle;

    return parsedTitle;
  }

  public get lectureTypes() {
    if (this._lectureTypes !== undefined) {
      return this._lectureTypes;
    }

    const parsedLectureTypes =
      this.$(this.$('a').attr('data-showed_type'))
        ?.text()
        ?.replace('Tipas: ', '')
        ?.replace(', ', ' ')
        ?.replace('ir ', '')
        ?.split(' ')
        ?.map((type) => type?.toLowerCase()?.trim()) || null;

    this._lectureTypes = parsedLectureTypes;

    return parsedLectureTypes;
  }

  public get groups() {
    if (this._groups !== undefined) {
      return this._groups;
    }

    const parsedGroups =
      this.$(this.$('a').attr('data-groups'))
        ?.find('a')
        ?.text()
        ?.split('gr.')
        ?.slice(0, -1)
        ?.map((group) => parseInt(group)) || null;

    this._groups = parsedGroups;

    return parsedGroups;
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

  public get startDateTime() {
    return this?.event?.start || null;
  }

  public get endDateTime() {
    return this?.event?.end || null;
  }

  public get programName() {
    return this._programName;
  }

  public get course() {
    return this._course;
  }

  public getAllData() {
    return {
      title: this.title,
      lectureTypes: this.lectureTypes,
      groups: this.groups,
      lecturer: this.lecturer,
      room: this.room,
      location: this.location,
      comment: this.comment,
      subgroup: this.subgroup,
      startDateTime: this.startDateTime,
      endDateTime: this.endDateTime,
      programName: this.programName,
      course: this.course,
    };
  }
}
