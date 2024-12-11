import { HttpStatusCode } from 'axios';
import { ResponseStatus } from '../constants/responseStatus';

export class GenericResponse<T> {
  status: ResponseStatus;
  statusCode: HttpStatusCode;
  data: T;

  constructor(data: T, status: ResponseStatus, statusCode: HttpStatusCode) {
    this.data = data;
    this.status = status;
    this.statusCode = statusCode;
  }
}
