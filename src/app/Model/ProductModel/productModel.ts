import {User} from '../UserModel/userModel';

export class Product {
  productID: number;
  name: string;
  weight: number;
  kilocalorie: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  creationDate: Date;
  status: string;
  allergens: string;
  description: string;
  user: User;
}
