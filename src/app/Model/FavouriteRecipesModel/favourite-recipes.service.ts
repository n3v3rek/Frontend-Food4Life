import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FavouriteRecipes} from './FavouriteRecipesModel';
import {Recipe} from '../RecipeModel/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class FavouriteRecipesService {

  //bazowy adres do api
  private baseUrl = 'http://localhost:8080/api/favourite/recipes';

  constructor(private http: HttpClient) { }

  // Pobranie ulubionego przepisu użytkowniak o userID i do przepisu o recipeID
  getFavoriteRecipe(userID: number, recipeID: number): Observable<any>{
    return this.http.get('${this.baseUrl}/${userID}/${recipeID}');
  }

  //Pobranie wszystkich ulubionych przepisow dla użytkownika o userID
  getAllUserFavoriteRecipes(userID: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/users/${userID}`);
  }

  //Dodanie ulubionego przepisu
  createFavoriteRecipe(favouriteRecipe: FavouriteRecipes): Observable<FavouriteRecipes>{
    return this.http.post<FavouriteRecipes>(this.baseUrl, favouriteRecipe);
  }

  //Usuniecie konkretnego przepisu z ulubionych użytkownika o userID i przepisu o recipeID
  deleteFavoriteRecipe(userID: number, recipeID: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${userID}/${recipeID}`);
  }

  //Edycja posiłku o danym mealID
  updateFavoriteRecipe(userID: number, recipeID: number, value: any): Observable<any>{
    return this.http.put('${this.baseUrl}/${userID}/${recipeID}', value);
  }
}
