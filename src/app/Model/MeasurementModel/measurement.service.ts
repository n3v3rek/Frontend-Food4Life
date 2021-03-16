import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Measurement} from './measurementModel';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  //bazowy adres do api
  private baseUrl = 'http://localhost:8080/api/measurements';

  //wstrzykniecie klienta http
  constructor(private http: HttpClient) { }

  // Pobranie dowolnego pomiaru o podanym measurementID
  getMeasurement(measurementID: number): Observable<any>{
    return this.http.get('${this.baseUrl}/${measurementID}');
  }

  //Stworzenie pomiaru
  createMeasurement(measurement: Measurement, userID: number): Observable<Measurement>{
    return this.http.post<Measurement>(`${this.baseUrl}/users/${userID}`, measurement);
  }

  //Pobranie pomiarów użytkownika o userID
  getUserMeasurements(userId: number): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(`${this.baseUrl}/user/${userId}`);
  }

  //Edycja pomiarów o danym measurementID
  updateMeasurement(measurementID: number, value: any): Observable<any>{
    return this.http.put('${this.baseUrl}/${measurementID}', value);
  }

  //Pobranie konkretnego pomiaru o measurementID użytkownika o userID
  getUserMeasurement(userID: number, measurementID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${userID}/${measurementID}');
  }

  //Usuniecie konkretnego pomiaru o measurementID
  deleteMeasurement(measurementID: number): Observable<any>{
    return this.http.delete('${this.baseUrl}/${measurementID}');
  }

  //Usuniecie wszystkich pomiarów
  deleteAllMeasurements(): Observable<any>{
    return this.http.delete(this.baseUrl);
  }
}
