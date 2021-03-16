import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {
  }

  //Pobranie produktu o konkretnym productID
  getProduct(productID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${productID}`);
  }

  //Pobranie produktow użytkownika o userID
  getUserProducts(userID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${userID}');
  }

  //Pobranie konkretnego produktu o produktID użytkownika o userID
  getUserProduct(userID: number, productID: number): Observable<any> {
    return this.http.get('${this.baseUrl}/${userID}/${productID}');
  }

  getAllAddedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/status/ADDED`);
  }

  getAllToBeCheckedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/status/TO_BE_CHECKED`);
  }

  //Pobranie wszystkich produktow
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  //Edycja produktu o danym productID
  updateProduct(productID: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${productID}`, value);
  }

  //Stworzenie produktu
  createProduct(product: Product, userID: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userID}`, product);
  }

  //Usuniecie produktu o konkretnym productID
  deleteProduct(productID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productID}`);
  }

  //Usuniecie wszystkich produktow
  deleteAllProducts(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
