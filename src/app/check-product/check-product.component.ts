import {Component, OnInit} from '@angular/core';
import {Product} from '../Model/ProductModel/productModel';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../Model/ProductModel/product.service';

@Component({
  selector: 'app-check-product',
  templateUrl: './check-product.component.html',
  styleUrls: ['./check-product.component.css']
})
export class CheckProductComponent implements OnInit {

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
    console.log(this.products);
  }

  loadData() {
    this.productService.getAllToBeCheckedProducts().subscribe(row => {
      console.log(row);
      this.products = row as Product[];
      console.log(this.products);
      this.loaded = true;
    }, row => console.log(row));
  }

  onSelected() {
    this.selectedProduct = this.products.find(row => row.productID == this.productForm.get('product').value);
    this.isloaded = true;
  }

  removeProduct() {
    let id = this.productForm.get('product').value;
    this.productService.deleteProduct(id).subscribe(
      row => {
        console.log(row)
        this.products = this.products.filter(row => row.productID != id);
        this.isloaded = false;
        this.productForm.reset();
        this.selectedProduct = new Product();
      }
    );
  }

  addProduct() {
    let id = this.productForm.get('product').value;
    this.selectedProduct.status = 'ADDED';
    this.productService.updateProduct(id, this.selectedProduct).subscribe(
      row => {
        console.log(row);
        this.products = this.products.filter(row => row.productID != id);
        this.isloaded = false;
        this.productForm.reset();
        this.selectedProduct = new Product();
      }
    );
  }
}
