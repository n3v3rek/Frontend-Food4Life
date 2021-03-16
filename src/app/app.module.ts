import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ButtonShowRecipeComponent } from './components/menu/button-show-recipe/button-show-recipe.component';
import { ShowMeasurementComponent } from './show-measurement/show-measurement.component';
import { FooterComponent} from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { MenuComponent } from './components/menu/menu.component';
import { ButtonMacronutrientsCalculationComponent } from './components/menu/button-macronutrients-calculation/button-macronutrients-calculation.component';
import { LogoComponent } from './components/banner/site-title/logo/logo.component';
import { MottoComponent } from './components/banner/site-title/motto/motto.component';
import { SiteTitleComponent } from './components/banner/site-title/site-title.component';
import { UserAccountComponent} from './components/banner/user-account/user-account.component';
import { ButtonsUserComponent } from './components/banner/buttons-user/buttons-user.component';
import { ButtonLoginComponent } from './components/banner/buttons-user/button-login/button-login.component';
import { ButtonRegisterComponent } from './components/banner/buttons-user/button-register/button-register.component';
import { AccountComponent } from './account/account.component';
import { HomePageComponentComponent } from './home-page-component/home-page-component.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalculateDemandComponent } from './calculate-demand/calculate-demand.component';
import { CalculateDemand2Component } from './calculate-demand2/calculate-demand2.component';
import { ButtonShowProductComponent} from './components/menu/button-show-product/button-show-product.component';
import { ShowRecipeComponent} from './show-recipe/show-recipe.component';
import { ShowProductComponent} from './show-product/show-product.component';
import { ShowClassificationComponent } from './show-classification/show-classification.component';
import { ButtonShowClassificationComponent} from './components/menu/button-show-classification/button-show-classification.component';
import { ButtonAddProductComponent } from './components/menu/button-add-product/button-add-product.component';
import { ButtonAddRecipeComponent } from './components/menu/button-add-recipe/button-add-recipe.component';
import { ButtonShowUserClassificationComponent } from './components/menu/button-show-user-classification/button-show-user-classification.component';
import { ButtonShowMeasurementComponent } from './components/menu/button-show-measurement/button-show-measurement.component';
import { ButtonAddMeasurementComponent } from './components/menu/button-add-measurement/button-add-measurement.component';
import { UserClassificationComponent } from './user-classification/user-classification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AddMeasurementComponent} from './add-measurement/add-measurement.component';
import { AddNutritionPlanComponent } from './add-nutrition-plan/add-nutrition-plan.component';
import { ButtonAddPlanComponent } from './components/menu/button-add-plan/button-add-plan.component';
import {CommonModule} from '@angular/common';
import { ButtonShowUserComponent } from './components/menu/button-show-user/button-show-user.component';
import { UsersComponent } from './users/users.component';
import {BanUserComponent} from './users/ban-user.component';
import { ButtonShowPlanComponent } from './components/menu/button-show-plan/button-show-plan.component';
import { ShowPlanComponent } from './show-plan/show-plan.component';
import { ButtonCheckRecipeComponent } from './components/menu/button-check-recipe/button-check-recipe.component';
import { ButtonCheckProductComponent } from './components/menu/button-check-product/button-check-product.component';
import { CheckProductComponent } from './check-product/check-product.component';
import { CheckRecipeComponent } from './check-recipe/check-recipe.component';

const appRoutes: Routes = [
  {path: 'dodaj/produkt', component: AddProductComponent},
  {path: 'dodaj/przepis', component: AddRecipeComponent},
  {path: 'dodaj/plan', component: AddNutritionPlanComponent},
  {path: 'dodaj/pomiar', component: AddMeasurementComponent},
  {path: 'users', component: UsersComponent},
  {path: 'konto', component: AccountComponent},
  {path: '', component: HomePageComponentComponent},
  {path: 'logowanie', component: LoginComponent},
  {path: 'rejestracja', component: RegisterComponent},
  {path: 'oblicz/zapotrzebowanie/informacje', component: CalculateDemandComponent},
  {path: 'oblicz/zapotrzebowanie/obliczenia', component: CalculateDemand2Component},
  {path: 'pokaz/produkt', component: ShowProductComponent},
  {path: 'pokaz/przepis', component: ShowRecipeComponent},
  {path: 'pokaz/plan', component: ShowPlanComponent},
  {path: 'pokaz/ranking/przepisow', component: ShowClassificationComponent},
  {path: 'pokaz/ranking/przepisow/uzytkownika', component: UserClassificationComponent},
  {path: 'pokaz/pomiar', component: ShowMeasurementComponent},
  {path: 'sprawdź/przepis',component: CheckRecipeComponent},
  {path: 'sprawdź/produkt',component: CheckProductComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    AddRecipeComponent,
    ButtonShowRecipeComponent,
    ShowMeasurementComponent,
    FooterComponent,
    BannerComponent,
    MenuComponent,
    ButtonMacronutrientsCalculationComponent,
    LogoComponent,
    MottoComponent,
    SiteTitleComponent,
    UserAccountComponent,
    ButtonsUserComponent,
    ButtonLoginComponent,
    ButtonRegisterComponent,
    AccountComponent,
    HomePageComponentComponent,
    PageNotFoundComponent,
    CalculateDemandComponent,
    CalculateDemand2Component,
    ButtonShowProductComponent,
    ButtonShowRecipeComponent,
    ShowProductComponent,
    ShowRecipeComponent,
    ButtonShowClassificationComponent,
    ShowClassificationComponent,
    ButtonAddProductComponent,
    ButtonAddRecipeComponent,
    ButtonShowUserClassificationComponent,
    ButtonShowMeasurementComponent,
    ButtonAddMeasurementComponent,
    UserClassificationComponent,
    AddMeasurementComponent,
    AddNutritionPlanComponent,
    ButtonAddPlanComponent,
    ButtonShowUserComponent,
    UsersComponent,
    BanUserComponent,
    ButtonShowPlanComponent,
    ShowPlanComponent,
    ButtonCheckRecipeComponent,
    ButtonCheckProductComponent,
    CheckProductComponent,
    CheckRecipeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatTableModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AgGridModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [ButtonLoginComponent,
  ShowPlanComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
