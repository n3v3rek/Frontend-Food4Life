import {Component, OnInit} from '@angular/core';
import {Product} from '../Model/ProductModel/productModel';
import {ProductService} from '../Model/ProductModel/product.service';
import {User} from '../Model/UserModel/userModel';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  product: Product;
  user: User;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.product = new Product();
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
/* Przerzucić elementy tworzone na backend, zeby zmniejszyc JSON'a */
  addNewProduct() {
    this.product.creationDate = new Date();
    this.product.status = 'TO_BE_CHECKED';
    this.productService.createProduct(this.product, this.user.userID).subscribe(
      row => console.log(row), row => console.log(row)
    );
    this.product = new Product();
  }


}
