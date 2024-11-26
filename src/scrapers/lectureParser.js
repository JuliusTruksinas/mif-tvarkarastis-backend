import * as cheerio from'cheerio';

export function parseLecture(event) {
  
  let parsedLecture={};

  const $ = cheerio.load(event.title);
  
  let title = $($('a').attr('data-title')).find('a').text();
  if(!title){
    title=event.title;
  }
  let type = $($('a').attr('data-showed_type')).text()
  .replace('Tipas: ', '')
  .replace(', ', ' ')
  .replace('ir ', '')
  .split(" ");
  
  let groups = $($('a').attr('data-groups')).find('a').text()
  .split("gr.")
  .slice(0,-1);

  let academics = $($('a').attr('data-academics')).find('a').text();
  
  let dataRooms= $($('a').attr('data-rooms')).find('a').text()
  let location;
  let room;
  if (!dataRooms){
    location=$($('a').attr('data-rooms')).text()
    .replace("Patalpos: ","");
  }
  else{
    dataRooms=dataRooms.replace('(MIF-Šalt.)', 'Šaltinis')
    .replace('(MIF-Naug.)', 'Naugardukas')
    .replace('(MIF-Didl.)', 'Didlaukis')
    .replace('S-', '')
    .split(" ");
    room=dataRooms[0];
    location=dataRooms[1]
  }


  let comments = $($('a').attr('data-comments')).text()
  .replace('Komentarai: ', '');
  
  let subgroup =  $($('a').attr('data-subgroups')).text()
  .replace('Pogrupiai: ', '');


  parsedLecture.start=event.start;
  parsedLecture.end=event.end;

  if(title){
    parsedLecture.title = title
  }

  if(type){
    parsedLecture.type = type
  }

  if(groups){
    parsedLecture.groups = groups.map((e)=>parseInt(e))
  }

  if(subgroup){
    parsedLecture.subGroup = parseInt(subgroup)
  }  

  if(academics){
    parsedLecture.academic = academics
  } 
  
  if(room){
    parsedLecture.room = parseInt(room)
  }         

  if(location){
    parsedLecture.location = location
  }      

  if(comments){
    parsedLecture.notes = comments
  } 
  return parsedLecture;
}  
