import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from './recipeModel';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:8080/api/recipes';

  constructor(private http: HttpClient) {
  }

  //Pobranie przepisu o konkretnym recipesID
  getRecipe(recipeID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${recipeID}`);
  }

  //Pobranie przepisów użytkownika o userID
  getUserRecipes(userID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${userID}');
  }

  //Pobranie top 10 przepisow;
  getTopTenRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/top/ten`);
  }

  //Pobranie konkretnego przepisu o recipeID użytkownika o userID
  getUserRecipe(userID: number, recipeID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${userID}/${recipeID}');
  }

  getAllToBeCheckedRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/status/TO_BE_CHECKED`);
  }

  getAllAddedRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/status/ADDED`);
  }

  //Pobranie wszystkich przepisów
  getAllRecipes(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  //Edycja przepisu o danym recipeID
  updateRecipe(recipeID: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${recipeID}`, value);
  }

  //Stworzenie przepisu
  createRecipe(recipe: Recipe, userID: number): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/${userID}`, recipe);
  }

  //Usuniecie przepisu o konkretnym recipeID
  deleteRecipe(recipeID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${recipeID}`);
  }

  //Usuniecie wszystkich przepisow
  deleteAllRecipes(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
