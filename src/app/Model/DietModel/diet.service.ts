import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Diet} from './dietModel';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  //bazowy adres do api
  private baseUrl = 'http://localhost:8080/api/diets';

  //wstrzykniecie klienta http
  constructor(private http: HttpClient) { }

  // Pobranie dowolnej diety o podanym dietID
  getDiet(dietID: number): Observable<any>{
    return this.http.get('${this.baseUrl}/${dietID}');
  }

  //Stworzenie diety
 createDiet(diet: Diet): Observable<any>{
    return this.http.post(this.baseUrl, diet);
  }

  //Pobranie diet użytkownika o userID
  getUserDiets(userID: number): Observable<any> {
      return this.http.get(`${this.baseUrl}/user/${userID}`);
  }

  //Edycja diety o danym dietID
  updateDiet(dietID: number, value: any): Observable<any>{
    return this.http.put('${this.baseUrl}/${dietID}', value);
  }

  //Pobranie konkretnej diety o dietID użytkownika o userID
  getUserDiet(userID: number, dietID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${userID}/${dietID}');
  }

  //Usuniecie konkretnej diety o dietID
  deleteDiet(dietID: number): Observable<any>{
    return this.http.delete('${this.baseUrl}/${dietID}');
  }

  //Usuniecie wszystkich diet
  deleteAll(): Observable<any>{
    return this.http.delete(this.baseUrl);
  }
}
