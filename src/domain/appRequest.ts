import { Request } from 'express';

export interface AppRequest extends Request {
  timezone: string;
}
