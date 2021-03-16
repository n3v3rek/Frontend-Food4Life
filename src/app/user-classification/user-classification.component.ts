import { Component, OnInit } from '@angular/core';
import {FavouriteRecipesService} from '../Model/FavouriteRecipesModel/favourite-recipes.service';
import {Recipe} from '../Model/RecipeModel/recipeModel';
import {User} from '../Model/UserModel/userModel';
import {BanUserComponent} from '../users/ban-user.component';

@Component({
  selector: 'app-user-classification',
  templateUrl: './user-classification.component.html',
  styleUrls: ['./user-classification.component.css']
})
export class UserClassificationComponent implements OnInit {

  user: User;
  dataSource: Recipe[];
  private gridApi;
  searchText: string;

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true
  };

  columnDefs = [
    {headerName: 'Nazwa', field: 'name'},
    {headerName: 'Treść przepisu', field: 'contentOfRecipe'},
    {headerName: 'Składniki', field: 'ingredients'},
    {headerName: 'Autor', field: 'user.username'},
  ];

  constructor(private favouriteRecipesService: FavouriteRecipesService ) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.loadData();
  }

  loadData(){
    console.log(this.user.userID);
    this.favouriteRecipesService.getAllUserFavoriteRecipes(this.user.userID).subscribe(row => {
      console.log(row);
      this.dataSource = row;
    }, row => console.log(row));
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  searchFilter() {
    if (this.searchText) {
      this.searchText = this.searchText.toLocaleLowerCase();
      this.gridApi.setQuickFilter(this.searchText);
    } else {
      this.gridApi.setRowData(this.dataSource);
    }
  }

}
