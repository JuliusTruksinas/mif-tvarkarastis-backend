const DEFAULT_TIME_ZONE = 'UTC';

export const detectTimezone = (req, res, next) => {
  const timezone = req.headers['x-timezone'] || DEFAULT_TIME_ZONE;
  req.timezone = timezone;
  next();
};
