import * as cheerio from 'cheerio';

enum Location {
  NAUGARDUKAS = 'naugardukas',
  SALTINIAI = 'šaltiniai',
  DIDLAUKIS = 'didlaukis',
}

export function parseLecture(event) {
  let parsedLecture: any = {};

  const $ = cheerio.load(event.title);

  let title = $($('a').attr('data-title')).find('a').text();
  if (!title) {
    title = event.title;
  }
  let lectureTypes = $($('a').attr('data-showed_type'))
    .text()
    .replace('Tipas: ', '')
    .replace(', ', ' ')
    .replace('ir ', '')
    .split(' ')
    .map((type) => type.toLowerCase());

  let groups = $($('a').attr('data-groups'))
    .find('a')
    .text()
    .split('gr.')
    .slice(0, -1);

  let lecturer = $($('a').attr('data-academics')).find('a').text();

  let dataRooms: any = $($('a').attr('data-rooms')).find('a').text();
  let location;
  let room;
  if (!dataRooms) {
    location = $($('a').attr('data-rooms')).text().replace('Patalpos: ', '');
  } else {
    dataRooms = dataRooms
      .replace('(MIF-Šalt.)', Location.SALTINIAI)
      .replace('(MIF-Naug.)', Location.NAUGARDUKAS)
      .replace('(MIF-Didl.)', Location.DIDLAUKIS)
      .replace('S-', '')
      .split(' ');
    room = dataRooms[0];
    location = dataRooms[1];
  }

  let comment = $($('a').attr('data-comments'))
    .text()
    .replace('Komentarai: ', '');

  let subgroup = $($('a').attr('data-subgroups'))
    .text()
    .replace('Pogrupiai: ', '');

  parsedLecture.startDateTime = event.start;
  parsedLecture.endDateTime = event.end;

  if (title) {
    parsedLecture.title = title;
  }

  if (lectureTypes && lectureTypes.length) {
    parsedLecture.lectureTypes = lectureTypes;
  }

  if (groups) {
    parsedLecture.groups = groups.map((e) => parseInt(e));
  }

  if (subgroup) {
    parsedLecture.subgroup = parseInt(subgroup);
  }

  if (lecturer) {
    parsedLecture.lecturer = lecturer;
  }

  if (room) {
    parsedLecture.room = parseInt(room);
  }

  if (location) {
    parsedLecture.location = location;
  }

  if (comment) {
    parsedLecture.comment = comment;
  }
  return parsedLecture;
}
