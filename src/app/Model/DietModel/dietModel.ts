import {User} from '../UserModel/userModel';

export class Diet{
  dietID: number;
  recommendedKilocalories: number;
  recommendedCarbohydrates: number;
  recommendedProteins: number;
  recommendedFats: number;
  creationDate: any = new Date();
  user: User;
}
