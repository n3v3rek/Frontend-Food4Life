import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ban} from './banModel';

@Injectable({
  providedIn: 'root'
})
export class BanService {

  //bazowy adres do api
  private baseUrl = 'http://localhost:8080/api/bans';

  constructor(private http: HttpClient) { }

  // Pobranie dowolnego bana o podanym banID
  getBan(banID: number): Observable<any>{
    return this.http.get('${this.baseUrl}/${banID}');
  }

  //Stworzenie bana
  createDiet(ban: Ban): Observable<any>{
    return this.http.post(this.baseUrl, ban);
  }

  //Pobranie bana użytkownika o userID
  getUserBans(userID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${userID}');
  }

  //Edycja bana o danym banID
  updateBan(banID: number, value: any): Observable<any>{
    return this.http.put('${this.baseUrl}/${banID}', value);
  }

  //Pobranie konkretnego bana o banID użytkownika o userID
  getUserBan(userID: number, banID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${userID}/${banID}');
  }

  //Usuniecie konkretnego bana o banID
  deleteBan(banID: number): Observable<any>{
    return this.http.delete('${this.baseUrl}/${banID}');
  }

  //Usuniecie wszystkich banów
  deleteAllBans(): Observable<any>{
    return this.http.delete(this.baseUrl);
  }
}
