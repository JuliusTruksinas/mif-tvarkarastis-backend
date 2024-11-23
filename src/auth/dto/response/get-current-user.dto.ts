import { IUser } from '../../../user/user.types';

export class GetCurrentUserDto {
  firstName: string;
  lastName: string;
  email: string;

  constructor(user: IUser) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}
