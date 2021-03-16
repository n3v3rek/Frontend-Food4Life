import {User} from '../UserModel/userModel';

export class Ban {
  banID: number;
  description: string;
  unbanDate: Date;
  user: User;
}
