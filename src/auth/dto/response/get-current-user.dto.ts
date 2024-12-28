import { IUser } from '../../../user/user.types';

export class GetCurrentUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studyType: number;
  programName: string;
  course: number;
  group: number;
  subgroup: number;
  preferredNavigationApp: 'googleMaps' | 'waze';

  constructor(user: IUser) {
    this.id = user._id.toString();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.studyType = user.studyType;
    this.programName = user.programName;
    this.course = user.course;
    this.group = user.group;
    this.subgroup = user.subgroup;
    this.preferredNavigationApp = user.preferredNavigationApp;
  }
}
