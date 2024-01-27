import { Gender } from '../enums';

export interface IUpdateUser {
  userId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  amount?: number;
  gender?: Gender;
}
