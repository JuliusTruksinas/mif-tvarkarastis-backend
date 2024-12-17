import moment from 'moment-timezone';

export const convertToUTC = (
  dateTimeString: string,
  timeZone: string,
): string => {
  const localTime = moment.tz(dateTimeString, timeZone);
  return localTime.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
};

export const convertFromUTC = (
  utcDateTimeString: string,
  timeZone: string,
): string => {
  const utcTime = moment.utc(utcDateTimeString);
  return utcTime.tz(timeZone).format('YYYY-MM-DDTHH:mm:ss');
};
