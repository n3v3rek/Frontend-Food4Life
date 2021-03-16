import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-show-product',
  templateUrl: './button-show-product.component.html',
  styleUrls: ['./button-show-product.component.css']
})
export class ButtonShowProductComponent implements OnInit {

  constructor(private guardService: GuardService) { }

  ngOnInit(): void {
  }

}
