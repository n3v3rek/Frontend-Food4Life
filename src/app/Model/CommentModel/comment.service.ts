import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../CommentModel/commentModel'
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  //bazowy adres do api
  private baseUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) { }

  // Pobranie komentarza użytkowniak o userID i do przepisu o recipeID
  getComment(userID: number, recipeID: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${userID}/${recipeID}`);
  }

  //Pobranie wszystkich komentarzy dla przepisu o recipeID
  getAllRecipeComments(recipeID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/${recipeID}`);
  }

  //Stworzenie komentarza
  createComment(comment: Comment): Observable<any>{
    return this.http.post(this.baseUrl, comment);
  }

  //Usuniecie konkretnego komentarza użytkownika o userID i przepisu o recipeID
  deleteComment(userID: number, recipeID: number): Observable<any>{
    return this.http.delete('${this.baseUrl}/${userID}/${recipeID}');
  }

  //Edycja posiłku o danym mealID
  updateComment(userID: number, recipeID: number, value: any): Observable<any>{
    return this.http.put('${this.baseUrl}/${userID}/${recipeID}', value);
  }
}
