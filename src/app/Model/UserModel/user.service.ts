import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  //Pobranie użytkownika o konkretnym userID
  getUser(userID: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${userID}`);
  }

  getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/login/${email}`);
  }

  //Pobranie wszystkich użytkowników
  getAllUsers(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  //Edycja użytkownika po podanym userID
  updateUser(userID: number, value: any): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/${userID}`, value);
  }

  //Stworzenie użytkownika
  createUser(user: User): Observable<any>{
    return this.http.post(this.baseUrl, user);
  }

  //Usuniecie użytkownika o konkretnym userID
  deleteUser(userID: number): Observable<any>{
    return this.http.delete('${this.baseUrl}/${userID}');
  }

  //Usuniecie wszystkich użytkowników
  deleteAllUsers(): Observable<any>{
    return this.http.delete(this.baseUrl);
  }
}
