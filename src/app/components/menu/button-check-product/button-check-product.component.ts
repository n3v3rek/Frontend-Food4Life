import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-check-product',
  templateUrl: './button-check-product.component.html',
  styleUrls: ['./button-check-product.component.css']
})
export class ButtonCheckProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkAccess() {
    if (GuardService.checkAccountTypeMODERATOR()) {
      return GuardService.checkAccountTypeMODERATOR();
    } else if (GuardService.checkAccountType()){
      return GuardService.checkAccountType();
    }
  }
}
