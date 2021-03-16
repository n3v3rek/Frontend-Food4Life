import {Component, OnInit} from '@angular/core';
import {UserService} from '../Model/UserModel/user.service';
import {User} from '../Model/UserModel/userModel';
import {BanUserComponent} from './ban-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  searchText: string;
  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapText: true
  };
  private gridApi;
  constructor(private userService: UserService) {
  }
  columnDefs = [
    {
      headerName: '', width: 180, cellRendererFramework: BanUserComponent,
      sortable: false, filter: false
    },
    {headerName: 'Mail', field: 'email'},
    {headerName: 'Nickname', field: 'username'},
    {headerName: 'Hasło', field: 'password'},
    {headerName: 'Typ Konta', field: 'accountType'},
    {headerName: 'Data Utworzenia', field: 'creationDate'},
    {headerName: 'Data Urodzenia', field: 'birthdayDate'}];

  ngOnInit(): void {
    this.loadData();
  }

   blockUser(user: User){
    let u = this.users.filter(row => row.userID !== user.userID)
    u.push(user);
    this.users = u;
    this.gridApi.setRowData(this.users);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  loadData() {
    this.userService.getAllUsers().subscribe(
      row => this.users = row);
  }

  searchFilter() {
    if (this.searchText) {
      this.searchText = this.searchText.toLocaleLowerCase();
      this.gridApi.setQuickFilter(this.searchText);
    } else {
      this.gridApi.setRowData(this.users);
    }
  }

}
