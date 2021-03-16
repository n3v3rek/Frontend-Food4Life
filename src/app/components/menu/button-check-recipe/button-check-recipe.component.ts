import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-check-recipe',
  templateUrl: './button-check-recipe.component.html',
  styleUrls: ['./button-check-recipe.component.css']
})
export class ButtonCheckRecipeComponent implements OnInit {

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
