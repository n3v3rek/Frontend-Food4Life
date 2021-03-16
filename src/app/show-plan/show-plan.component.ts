import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MealService} from '../Model/MealModel/meal.service';
import {DietService} from '../Model/DietModel/diet.service';
import {User} from '../Model/UserModel/userModel';
import {Diet} from '../Model/DietModel/dietModel';
import {Meal} from '../Model/MealModel/mealModel';
import {Product} from '../Model/ProductModel/productModel';
import {Recipe} from '../Model/RecipeModel/recipeModel';
import {PlanNutriModel} from '../add-nutrition-plan/planNutri.model';
import {MealProductService} from '../Model/MealProductModel/meal-product.service';
import {MealRecipeService} from '../Model/MealRecipeModel/meal-recipe.service';
import {MealRecipe} from '../Model/MealRecipeModel/mealRecipeModel';
import {MealProduct} from '../Model/MealProductModel/mealProductModel';

@Component({
  selector: 'app-show-plan',
  templateUrl: './show-plan.component.html',
  styleUrls: ['./show-plan.component.css']
})
export class ShowPlanComponent implements OnInit {

  user: User;
  diets: Diet [];
  selectedDiet: Diet;
  dietForm: FormGroup;
  mels: Meal[];
  private gridApi;

  products: Product[];
  recipes: Recipe[];
  datarow: PlanNutriModel[];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true
  };

  columnDefs = [
    {headerName: 'Rodzaj diety', field: 'diet'},
    {headerName: 'Dzień Tygodnia', field: 'dayOfWeek'},
    {headerName: 'Numer posiołku', field: 'numerOfMeal'},
    {headerName: 'Przepis', field: 'recipe'},
    {headerName: 'Produkt', field: 'produkt'},
    {headerName: 'Szczegóły', field: 'content'}
  ];

  constructor(private fb: FormBuilder,
              private dietService: DietService,
              private mealService: MealService,
              private mealProductService: MealProductService,
              private mealRecipeService: MealRecipeService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.loadData();
  }


  ngOnInit(): void {
    this.dietForm = this.fb.group({
      diet: null
    });
    this.datarow = [];
    console.log(this.diets);
  }

  loadData() {
    this.dietService.getUserDiets(this.user.userID).subscribe(row => {
      console.log(row);
      this.diets = row as Diet[];
      console.log(this.diets);
    }, row => console.log(row));
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  onSelected() {
    let idDiet = this.dietForm.get('diet').value;
    console.log(idDiet);
    this.mealService.getAllDietMeals(idDiet).subscribe(
      row => {
        this.mels = row as Meal[];
        console.log(row);
        let tabM = [];
        if (row) {
          row.forEach(
            m => {
              tabM.push(m.mealID);
            }
          );
          this.mealRecipeService.getAllMealRecipes(tabM).subscribe(
            row => {
              console.log(row);
              row.forEach(
                r => {
                  console.log(r);
                  this.datarow.push(this.mapMealRecipeToNutruPlan(r))
                }
              );
              this.gridApi.setRowData(this.datarow);
            });
          this.mealProductService.getAllMealProducts(tabM).subscribe(
            row => {
              console.log(row);
              row.forEach(
                r => {
                  console.log(r);
                  this.datarow.push(this.mapMealProductToNutruPlan(r))
                }
              );
              this.gridApi.setRowData(this.datarow);
            }
          );
        }
      }
    );

  }

  mapMealRecipeToNutruPlan(row: MealRecipe) : PlanNutriModel {
    let np: PlanNutriModel = new PlanNutriModel();
    let dieta = row.meal.diet;
    np.diet = 'kcal: ' + dieta.recommendedKilocalories + ' w: ' + dieta.recommendedCarbohydrates + ' b: ' + dieta.recommendedProteins + ' f: ' + dieta.recommendedFats;
    np.dayOfWeek = row.meal.dayOfTheWeek;
    np.numerOfMeal = row.meal.mealNumber;
    np.recipe = row.recipe.name;
    np.content = row.recipe.contentOfRecipe;
    console.log(np)
    return np;
  }

  mapMealProductToNutruPlan(row: MealProduct): PlanNutriModel {
    let np: PlanNutriModel = new PlanNutriModel();
    let dieta = row.meal.diet;
    np.diet = 'kcal: ' + dieta.recommendedKilocalories + ' w: ' + dieta.recommendedCarbohydrates + ' b: ' + dieta.recommendedProteins + ' f: ' + dieta.recommendedFats;
    np.dayOfWeek = row.meal.dayOfTheWeek;
    np.numerOfMeal = row.meal.mealNumber;
    np.produkt = row.product.name;
    np.content = '';
    console.log(np)
    return np;
  }
}
