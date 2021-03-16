import {Component, OnInit} from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-add-product',
  templateUrl: './button-add-product.component.html',
  styleUrls: ['./button-add-product.component.css']
})
export class ButtonAddProductComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }
}
