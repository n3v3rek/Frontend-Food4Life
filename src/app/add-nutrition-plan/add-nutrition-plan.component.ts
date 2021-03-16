import {Component, OnInit} from '@angular/core';
import {ProductService} from '../Model/ProductModel/product.service';
import {Product} from '../Model/ProductModel/productModel';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RecipeService} from '../Model/RecipeModel/recipe.service';
import {Recipe} from '../Model/RecipeModel/recipeModel';
import {MealService} from '../Model/MealModel/meal.service';
import {User} from '../Model/UserModel/userModel';
import {DietService} from '../Model/DietModel/diet.service';
import {Diet} from '../Model/DietModel/dietModel';
import {Meal} from '../Model/MealModel/mealModel';
import {MealProductService} from '../Model/MealProductModel/meal-product.service';
import {MealRecipeService} from '../Model/MealRecipeModel/meal-recipe.service';
import {PlanNutriModel} from './planNutri.model';

@Component({
  selector: 'app-add-nutrition-plan',
  templateUrl: './add-nutrition-plan.component.html',
  styleUrls: ['./add-nutrition-plan.component.css']
})
export class AddNutritionPlanComponent implements OnInit {

  dniTygodnia = ['PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK', 'SOBOTA', 'NIEDZIELA'];
  liczbaPosiolkow = [1, 2, 3, 4, 5];
  products: Product[];
  recipes: Recipe[];
  diets: Diet[];
  meals: Meal[];
  choosenMeal: Meal;
  datarow: PlanNutriModel[];
  private gridApi;
  user: User;

  isloaded = false;
  planForms: FormGroup;
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
    {headerName: 'Produkt', field: 'produkt'}
  ];


  constructor(private productService: ProductService,
              private przepisyService: RecipeService,
              private mealService: MealService,
              private deitService: DietService,
              private mealProductService: MealProductService,
              private mealRecipeService: MealRecipeService,
              private formsB: FormBuilder) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit(): void {
    this.products = [];
    this.recipes = [];
    this.datarow = [];
    this.planForms = this.formsB.group({
      dniaTygodnia: null,
      dietaRodzaj: null,
      numerPosiolku: null,
      produktu: null,
      przepis: null
    });
    this.loadData();
  }

  loadData() {
    this.productService.getAllProducts().subscribe(
      row => {
        this.products = row as Product[];
        this.przepisyService.getAllRecipes().subscribe(
          row => {
            this.recipes = row as Recipe[];
            if (this.user) {
              console.log(this.user.userID);
              this.deitService.getUserDiets(this.user.userID).subscribe(
                row => {
                  this.diets = row as Diet[];
                  this.isloaded = true;
                }, row => console.log(row)
              );
            }
          }
          , row => console.log(row));
      }, row => console.log(row));

  }

  addNewConnections(dayOfWeek, numberOfMeal) {
    const product = this.planForms.get('produktu').value;
    const recipe = this.planForms.get('przepis').value;
    product ? this.productService.getProduct(product).subscribe(
      row => {
        let productData = row;
        this.mealProductService.createMealProduct(this.choosenMeal.mealID, product)
          .subscribe(
            row => {
              console.log(row);
              this.addToGrid(dayOfWeek, numberOfMeal, '', productData.name);
              this.planForms.reset();
            }
          );
      }) :
      this.przepisyService.getRecipe(recipe).subscribe(
        row => {
          console.log(row);
          let recpiedata = row;
          this.mealRecipeService
            .createMealRecipe(this.choosenMeal.mealID, recipe)
            .subscribe(
              row => {
                console.log(row);
                this.addToGrid(dayOfWeek, numberOfMeal, recpiedata.name, '');
                this.planForms.reset();
              });
        });
  }


  findMealsForDiet() {
    const dietId = this.planForms.get('dietaRodzaj').value;
    const dayOfWeek = this.planForms.get('dniaTygodnia').value;
    const numberOfMeal = this.planForms.get('numerPosiolku').value;

    this.mealService.getAllDietMeals(dietId).subscribe(
      row => {
        const m: Meal[] = row;
        this.choosenMeal = m[m.findIndex(row => {
          return row.dayOfTheWeek == dayOfWeek && row.mealNumber == numberOfMeal;
        })];
      }, row => console.log(row),
      () => this.addNewConnections(dayOfWeek, numberOfMeal)
    );
  }

  addToGrid(dayOfWeek, numberOfMeal, recipe, product) {
    this.datarow.push(this.mapToNutruPlan(dayOfWeek, numberOfMeal, recipe, product));
    this.gridApi.setRowData(this.datarow);
  }

  mapToNutruPlan(dayOfWeek, numberOfMeal, recipe, product) {
    let np: PlanNutriModel = new PlanNutriModel();
    let dieta = this.diets[this.diets.findIndex(row => row.dietID === this.choosenMeal.diet.dietID)];
    np.diet = 'kcal: ' + dieta.recommendedKilocalories + ' w: ' + dieta.recommendedCarbohydrates + ' b: ' + dieta.recommendedProteins + ' f: ' + dieta.recommendedFats;
    np.dayOfWeek = dayOfWeek;
    np.numerOfMeal = numberOfMeal;
    np.recipe = recipe;
    np.produkt = product;
    return np;
  }

}
