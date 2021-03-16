import {User} from '../UserModel/userModel';
import {Recipe} from '../RecipeModel/recipeModel';

export class FavouriteRecipes {
  user: User;
  recipe: Recipe;
  userRecipeKey: number;
}
