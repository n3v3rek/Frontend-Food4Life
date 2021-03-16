import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Recipe} from '../Model/RecipeModel/recipeModel';
import {RecipeService} from '../Model/RecipeModel/recipe.service';
import {FavouriteRecipesService} from '../Model/FavouriteRecipesModel/favourite-recipes.service';
import {GuardService} from '../guard/guard.service';
import {FavouriteRecipes} from '../Model/FavouriteRecipesModel/FavouriteRecipesModel';
import {User} from '../Model/UserModel/userModel';
import {Router} from '@angular/router';
import {Comment} from '../Model/CommentModel/commentModel';
import {CommentService} from '../Model/CommentModel/comment.service';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.css']
})
export class ShowRecipeComponent implements OnInit {

  recipes: Recipe [];
  loaded = false;
  isloaded = false;
  user: User;
  selectedProduct: Recipe;
  recipeForm: FormGroup;
  ulubione = false;
  visible;
  favoriteRecipe: Recipe[];
  comments: Comment[];
  coms: Comment;

  constructor(private fb: FormBuilder,
              private recipeService: RecipeService,
              private commentService: CommentService,
              private favouriteRecipe: FavouriteRecipesService,
              private router: Router) {
    this.loadData();
  }


  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipe: [null]
    });
    this.favoriteRecipe = [];
    this.coms = new Comment();
    this.comments = [];
    console.log(this.recipes);
  }

  loadData() {
    this.recipeService.getAllAddedRecipes().subscribe(row => {
      this.recipes = row as Recipe[];
      console.log(this.recipes);
      if (!this.checkAccess()) {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.favouriteRecipe.getAllUserFavoriteRecipes(this.user.userID).subscribe(
          row => this.favoriteRecipe = row);
        console.log(this.favoriteRecipe);
      }
      this.loaded = true;
    }, row => console.log(row));
  }

  onSelected() {
    this.selectedProduct = this.recipes.find(row => row.recipeID == this.recipeForm.get('recipe').value);
    this.visible = !this.checkAccess();
    this.commentService.getAllRecipeComments(this.selectedProduct.recipeID).subscribe(
      row => {
        console.log(row);
        this.comments = row;
      }
    );
    if (this?.favoriteRecipe) {
      let indexOfProduct = this.favoriteRecipe.findIndex(row => row.recipeID == this.recipeForm.get('recipe').value);
      if (indexOfProduct != -1) {
        this.ulubione = true;
      } else {
        this.ulubione = false;
      }
    }
    console.log(this.visible);
    console.log(this.ulubione);
    this.isloaded = true;
  }

  addToFavorite() {
    if (!this.ulubione) {
      let fR = new FavouriteRecipes();
      fR.recipe = this.selectedProduct;
      fR.user = this.user;
      this.favouriteRecipe.createFavoriteRecipe(fR).subscribe(
        row => {
          console.log(row);
          this.favoriteRecipe.push(row.recipe);
          this.ulubione = true;
          this.selectedProduct.likesCounter++;
        }
      );
    } else {
      this.favouriteRecipe.deleteFavoriteRecipe(this.user.userID, this.selectedProduct.recipeID).subscribe(
        row => {
          console.log(row);
          this.favoriteRecipe = this.favoriteRecipe.filter(row => row.recipeID != this.selectedProduct.recipeID);
          this.ulubione = false;
          this.selectedProduct.likesCounter--;
        }
      );
    }
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }

  createComment() {
    this.coms.creationDate = new Date();
    this.coms.user = this.user;
    this.coms.recipe = new Recipe();
    this.coms.recipe.recipeID = this.selectedProduct.recipeID;
    this.coms.status = 'TO-BE-CHECKED';
    this.commentService.createComment(this.coms).subscribe(
      row => {
        console.log(row);
        if (!this.comments) {
          this.comments = [];
        }
        this.comments.push(row);
        this.coms = new Comment();
      }
    );
  }

}
