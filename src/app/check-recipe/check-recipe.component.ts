import { Component, OnInit } from '@angular/core';
import {Recipe} from '../Model/RecipeModel/recipeModel';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RecipeService} from '../Model/RecipeModel/recipe.service';
import {Product} from '../Model/ProductModel/productModel';

@Component({
  selector: 'app-check-recipe',
  templateUrl: './check-recipe.component.html',
  styleUrls: ['./check-recipe.component.css']
})
export class CheckRecipeComponent implements OnInit {

  recipes: Recipe [];
  loaded = false;
  isloaded = false;
  selectedRecipe: Recipe;
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private recipeService: RecipeService) {
    this.loadData();
  }


  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipe: [null]
    });
    console.log(this.recipes)
  }

  loadData() {
    this.recipeService.getAllToBeCheckedRecipes().subscribe(row => {
      console.log(row);
      this.recipes = row as Recipe[];
      console.log(this.recipes)
      this.loaded = true;
    }, row => console.log(row));
  }

  onSelected(){
    this.selectedRecipe = this.recipes.find(row => row.recipeID == this.recipeForm.get('recipe').value)
    this.isloaded = true;
  }



  removeRecipe() {
    let id = this.recipeForm.get('recipe').value;
    this.recipeService.deleteRecipe(id).subscribe(
      row => {
        console.log(row)
        this.recipes = this.recipes.filter(row => row.recipeID != id);
        this.isloaded = false;
        this.recipeForm.reset();
        this.selectedRecipe = new Recipe();
      }
    );
  }

  addRecipe() {
    let id = this.recipeForm.get('recipe').value;
    this.selectedRecipe.status = 'ADDED';
    this.recipeService.updateRecipe(id, this.selectedRecipe).subscribe(
      row => {
        console.log(row);
        this.recipes = this.recipes.filter(row => row.recipeID != id);
        this.isloaded = false;
        this.recipeForm.reset();
        this.selectedRecipe = new Recipe();
      }
    );
  }
}
