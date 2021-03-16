import {Component, OnInit} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {UserService} from '../Model/UserModel/user.service';
import {BanService} from '../Model/BanModel/ban.service';
import {Ban} from '../Model/BanModel/banModel'
import {User} from '../Model/UserModel/userModel';
import {UsersComponent} from './users.component';

@Component({
  selector: 'ban-user',
  template: '<button (click)="blockUser(this.params)" style="width: 120px; height: 36px; margin-top: 10px; font-size: 16px; text-align: center;"> {{buttonName}} </button>',
  styleUrls: ['../user-classification/user-classification.component.css']
})
export class BanUserComponent implements AgRendererComponent {

  params;
  buttonName = 'BANUJ';
  isBanned = false;

  constructor(private userService: UserService,
              private banService: BanService,
              private userComponent : UsersComponent) {

  }

  blockUser(params) {
    let ban = new Ban();
    console.log(params)
    ban.user = params.data;
    ban.description = "Zablokowano użytkownika bezpośrednio przez Admina."
    ban.unbanDate = new Date();
    console.log(ban)
      this.banService.createDiet(ban).subscribe(
        row => {
          let user : User = params.data;
          user.accountType == 'BANNED' ? user.accountType = 'USER' : user.accountType = 'BANNED';
          this.isBanned ? this.buttonName = 'ODBANUJ' : this.buttonName = 'BANUJ';
          this.isBanned = !this.isBanned;
          this.userService.updateUser(user.userID, user).subscribe(
            row => {
              console.log(row)
              this.userComponent.blockUser(row);
            }
          );
        }
      )
  }

  agInit(params): void {
    this.params = params;
    if(this.params.data.accountType != 'BANNED'){
      this.buttonName = 'BANUJ';
      this.isBanned = false;
    }else {
      this.buttonName = 'ODBANUJ';
      this.isBanned = false;
    }
  }

  refresh(params): boolean {
    return false;
  }
}
