import { Gender } from '../enums';

export interface ICreateUser {
  username: string;
  firstName?: string;
  lastName?: string;
  gender: Gender;
}
