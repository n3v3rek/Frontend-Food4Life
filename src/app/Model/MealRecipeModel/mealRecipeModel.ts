import {Recipe} from '../RecipeModel/recipeModel';
import {Meal} from '../MealModel/mealModel';

export class MealRecipe {
  weight: number;
  recipe: Recipe;
  meal: Meal;
  mealRecipeKey: number;
}
