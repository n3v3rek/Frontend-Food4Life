import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-show-recipe',
  templateUrl: './button-show-recipe.component.html',
  styleUrls: ['./button-show-recipe.component.css']
})
export class ButtonShowRecipeComponent implements OnInit {

  constructor(private guardService: GuardService) { }

  ngOnInit(): void {
  }

}
