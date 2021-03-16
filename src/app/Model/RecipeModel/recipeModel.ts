import {User} from '../UserModel/userModel';

export class Recipe {
  recipeID: number;
  name: string;
  contentOfRecipe: string;
  ingredients: string;
  creationDate: any = new Date();
  kilocalorie: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  weight: number;
  description: string;
  likesCounter: number;
  status: string;
  user: User;
}
