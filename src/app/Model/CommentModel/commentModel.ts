import {Recipe} from '../RecipeModel/recipeModel';
import {User} from '../UserModel/userModel';

export class Comment {
  contentOfComment: string;
  creationDate: Date;
  status: string;
  user: User;
  recipe: Recipe;
  userRecipeKey: number;

  constructor() {
  }
}
