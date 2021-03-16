import { Component, OnInit } from '@angular/core';
import {User} from '../Model/UserModel/userModel';
import {Recipe} from '../Model/RecipeModel/recipeModel';
import {RecipeService} from '../Model/RecipeModel/recipe.service';

@Component({
  selector: 'app-show-classification',
  templateUrl: './show-classification.component.html',
  styleUrls: ['./show-classification.component.css']
})
export class ShowClassificationComponent implements OnInit {

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
    {headerName: 'Polubenia', field:'likesCounter'}
  ];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.recipeService.getTopTenRecipes().subscribe(row => {
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
