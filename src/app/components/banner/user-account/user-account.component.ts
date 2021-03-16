import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';
import {User} from '../../../Model/UserModel/userModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  user : User;
  constructor() { }

  ngOnInit(): void {
    this.user = new User();
  }

  checkAccess(){
    return GuardService.checkAccountTypeGOSC();
  }

  getUserName(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
    return this.user.username;
  }

}
