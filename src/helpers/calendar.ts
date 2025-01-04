import { ILectureEvent } from '../lecture-event/lectureEvent.types';
import { IUserEvent } from '../user-event/userEvent.types';

interface BaseIcsObjectProperties {
  startInputType: 'utc' | 'local';
  startOutputType: 'utc' | 'local';
  endInputType: 'utc' | 'local';
  endOutputType: 'utc' | 'local';
}

export interface IcsObject extends BaseIcsObjectProperties {
  start: string;
  end: string;
  title: string;
  description: string;
}

const BASE_ICS_OBJECT_PROPERTIES: BaseIcsObjectProperties = {
  startInputType: 'utc',
  startOutputType: 'local',
  endInputType: 'utc',
  endOutputType: 'local',
};

export const isLectureEvent = (
  event: IUserEvent | ILectureEvent,
): event is ILectureEvent => {
  return (event as ILectureEvent).lecturer !== undefined;
};

export const toICSDateString = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const transformLectureEventToIcsObject = (
  lectureEvent: ILectureEvent,
): IcsObject => {
  return {
    ...BASE_ICS_OBJECT_PROPERTIES,
    start: toICSDateString(lectureEvent.startDateTime),
    end: toICSDateString(lectureEvent.endDateTime),
    title: lectureEvent.title,
    description: `Lecturer: ${
      lectureEvent.lecturer
    }; Lecture types: ${lectureEvent.lectureTypes.join(',')}; Location: ${
      lectureEvent.location
    }`,
  };
};

const transformUserEventToIcsObject = (userEvent: IUserEvent): IcsObject => {
  return {
    ...BASE_ICS_OBJECT_PROPERTIES,
    start: toICSDateString(userEvent.startDateTime),
    end: toICSDateString(userEvent.endDateTime),
    title: userEvent.title,
    description: `Location: ${userEvent?.location}; Notes: ${userEvent?.note}`,
  };
};

export const transformCalendarEventsToIcsObjects = (
  calendarEvents: (IUserEvent | ILectureEvent)[],
) => {
  return calendarEvents.map((calendarEvent) =>
    isLectureEvent(calendarEvent)
      ? transformLectureEventToIcsObject(calendarEvent)
      : transformUserEventToIcsObject(calendarEvent),
  );
};
