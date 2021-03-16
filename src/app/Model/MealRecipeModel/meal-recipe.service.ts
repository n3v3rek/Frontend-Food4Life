import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MealRecipe} from './mealRecipeModel';

@Injectable({
  providedIn: 'root'
})
export class MealRecipeService {

  //bazowy adres do api
  private baseUrl = 'http://localhost:8080/api/meals/recipes';

  constructor(private http: HttpClient) {
  }

  // Pobranie tabeli mealRecipe dla posiłku o mealID i dla przepisu o recipeID
  getMealRecipe(mealID: number, recipeID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${mealID}/${recipeID}');
  }

  //Pobranie wszystkich rekordow mealRecipe dla posiłku o mealID
  getAllMealRecipes(mealID: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/all`,  mealID);
  }

  //Stworzenie mealRecipe
  createMealRecipe(recipeID: number, mealID: number): Observable<any> {
    // @ts-ignore
    return this.http.post(`${this.baseUrl}/${recipeID}/${mealID}`);
  }

  //Usuniecie konkretnego rekordu tabeli MealRecipe posiłku o mealID i przepisu o recipeID
  deleteMealRecipe(mealID: number, recipeID: number): Observable<any> {
    return this.http.delete('${this.baseUrl}/${mealID}/${recipeID}');
  }

  //Usuniecie wszystkich rekordów tabeli MealRecipe dla posiłku o mealID
  deleteAllMealRecipe(mealID: number): Observable<any> {
    return this.http.delete('${this.baseUrl}/${mealID}');
  }

  //Edycja rekordu tabeli MealRecipe o danym mealID i recipeID
  updateMealRecipe(mealID: number, recipeID: number, value: any): Observable<any> {
    return this.http.put('${this.baseUrl}/${mealID}/${recipeID}', value);
  }
}
