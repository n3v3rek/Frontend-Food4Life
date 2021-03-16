import {Component, OnInit} from '@angular/core';
import {Measurement} from '../Model/MeasurementModel/measurementModel';
import {MeasurementService} from '../Model/MeasurementModel/measurement.service';
import {User} from '../Model/UserModel/userModel';

@Component({
  selector: 'app-show-measurement',
  templateUrl: './show-measurement.component.html',
  styleUrls: ['./show-measurement.component.css']
})
export class ShowMeasurementComponent implements OnInit {

  user: User;
  dataSource: Measurement[];
  private gridApi;
  searchText: string;

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true
  };

  //TODO wpisz tytuly tabel
  columnDefs = [
    {headerName: 'Waga', field: 'weight'},
    {headerName: 'Wzrost', field: 'growth'},
    {headerName: 'Biodra', field: 'hipSize'},
    {headerName: 'Talia', field: 'waistSize'},
    {headerName: 'Biceps', field: 'bicepsCircumference'},
    {headerName: 'Klatka', field: 'chestCircumference'},
    {headerName: 'Udo', field: 'thighCircumference'},
    {headerName: 'Łydka', field: 'calfCircumference'},
    {headerName: 'Data powstania', field: 'creationDate'},
    {headerName: 'Opis', field: 'description'}
  ];

  constructor(private measurementService: MeasurementService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.loadData();
  }

  loadData() {
    console.log(this.user.userID);
    this.measurementService.getUserMeasurements(this.user.userID).subscribe(row => {
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


