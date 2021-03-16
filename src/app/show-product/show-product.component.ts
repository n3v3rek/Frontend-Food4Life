import { Component, OnInit } from '@angular/core';
import {Product} from '../Model/ProductModel/productModel';
import {ProductService} from '../Model/ProductModel/product.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  products: Product [];
  loaded = false;
  isloaded = false;
  selectedProduct: Product;
  productForm: FormGroup;

  constructor(private productService: ProductService,
              private fb: FormBuilder) {
    this.products = [];
    this.loadData();
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      product: [null]
    });
    console.log(this.products)
  }

  loadData() {
    this.productService.getAllAddedProducts().subscribe(row => {
      console.log(row);
      this.products = row as Product[];
      console.log(this.products)
      this.loaded = true;
    }, row => console.log(row));
  }

  onSelected(){
    this.selectedProduct = this.products.find(row => row.productID == this.productForm.get('product').value);
    this.isloaded = true;
  }
}
