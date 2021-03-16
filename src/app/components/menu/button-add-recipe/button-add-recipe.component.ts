import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-add-recipe',
  templateUrl: './button-add-recipe.component.html',
  styleUrls: ['./button-add-recipe.component.css']
})
export class ButtonAddRecipeComponent implements OnInit {

  constructor(private guardService: GuardService) { }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }
}
