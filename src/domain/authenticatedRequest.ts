import { IUser } from '../user/user.types';
import { AppRequest } from './appRequest';

export interface AuthenticatedRequest extends AppRequest {
  user: IUser;
}
