import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MealProduct} from './mealProductModel';

@Injectable({
  providedIn: 'root'
})
export class MealProductService {

  //bazowy adres do api
  private baseUrl = 'http://localhost:8080/api/meals/products';

  constructor(private http: HttpClient) {
  }

  // Pobranie tabeli mealProduct dla posiłku o mealID i dla produktu o productID
  getMealProduct(mealID: number, productID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${mealID}/${productID}');
  }

  //Pobranie wszystkich rekordow mealProduct dla posiłku o mealID
  getAllMealProducts(mealID: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/all`, mealID);
  }

  //Stworzenie mealProduct
  createMealProduct(mealID: number, recipeID: number): Observable<any> {
    // @ts-ignore
    return this.http.post(`${this.baseUrl}/${mealID}/${recipeID}`);
  }

  //Usuniecie konkretnego rekordu tabeli MealProduct posiłku o mealID i produktu o productID
  deleteMealProduct(mealID: number, productID: number): Observable<any> {
    return this.http.delete('${this.baseUrl}/${mealID}/${productID}');
  }

  //Usuniecie wszystkich rekordów tabeli MealProduct dla posiłku o mealID
  deleteAllMealProduct(mealID: number): Observable<any> {
    return this.http.delete('${this.baseUrl}/${mealID}');
  }

  //Edycja rekordu tabeli MealProduct o danym mealID i productID
  updateMealProduct(mealID: number, productID: number, value: any): Observable<any> {
    return this.http.put('${this.baseUrl}/${mealID}/${productID}', value);
  }
}
