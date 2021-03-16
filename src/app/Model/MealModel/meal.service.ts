import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Meal} from './mealModel';
import {Diet} from '../DietModel/dietModel';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  //bazowy adres do api
  private baseUrl = 'http://localhost:8080/api/meals';

  constructor(private http: HttpClient) {
  }

  // Pobranie dowolnego posiłku o podanym mealID
  getMeal(mealID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${mealID}');
  }

  findMealByMetaData(meal : any): Observable<any> {
    console.log(meal)
    return this.http.get(`${this.baseUrl}/mealByDiet`, meal);
  }

  //Stworzenie posiłku
  createMeal(meal: Meal): Observable<any> {
    return this.http.post(this.baseUrl, meal);
  }

  //Pobranie wszystkich posilkow z diety o dietID
  getAllDietMeals(dietID: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.baseUrl}/diets/${dietID}`);
  }

  //Edycja posiłku o danym mealID
  updateMeal(mealID: number, value: any): Observable<any> {
    return this.http.put('${this.baseUrl}/${mealID}', value);
  }

  //Pobranie posiłku z mealID z diety o dietID
  getDietMeal(mealID: number, dietID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/diets/${dietID}/${mealID}');
  }

  //Usuniecie konkretnego posiłku o mealID
  deleteMeal(mealID: number): Observable<any> {
    return this.http.delete('${this.baseUrl}/${mealID}');
  }

  //Usuniecie wszystkich posiłków
  deleteAllMeals(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  //Usuniecie wszystkich posiłków z diety o dietID
  deleteAllDietMeals(dietID: number): Observable<any> {
    return this.http.delete('${this.baseUrl}/diets/${dietID}');
  }
}
