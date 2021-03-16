import { Component, OnInit } from '@angular/core';
import {User} from '../Model/UserModel/userModel';
import {RecipeService} from '../Model/RecipeModel/recipe.service';
import {Recipe} from '../Model/RecipeModel/recipeModel';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipe: Recipe;
  user: User;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipe = new Recipe();
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  addNewRecipe() {
    this.recipe.creationDate = new Date();
    this.recipe.likesCounter = 0;
    this.recipe.status = "TO_BE_CHECKED";
    this.recipeService.createRecipe(this.recipe,this.user.userID).subscribe(
      row => console.log(row), row => console.log(row)
    );
    this.recipe = new Recipe();
  }
}
