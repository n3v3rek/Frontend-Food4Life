import {Product} from '../ProductModel/productModel';
import {Meal} from '../MealModel/mealModel';

export class MealProduct {
  weight: number;
  product: Product;
  meal: Meal;
  mealProductKey: number;
}
