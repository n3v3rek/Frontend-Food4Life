import { Component, OnInit } from '@angular/core';
import {User} from '../Model/UserModel/userModel';
import {UserService} from '../Model/UserModel/user.service';
import {GuardService} from '../guard/guard.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;

  usernameToBeSet;
  passwordProvided1;
  requestResult1;

  passwordToBeSet1;
  passwordToBeSet2;
  passwordProvided2;

  passwordProvided3;
  passwordProvided4;

  requestResult2;

  pathRouting = "konto";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  changeNickname():void{
    if (this.passwordProvided1 !== this.user.password){
      this.requestResult1 = 'Podano nieprawidłowe hasło';
    } else if (this.usernameToBeSet === this.user.username ){
      this.requestResult1 = 'Nowa nazwa jest taka sama jak poprzednia.';
    } else if (this.usernameToBeSet ==""){
      this.requestResult1 = 'Nie można mieć pustej nazwy';
    } else if (this.usernameToBeSet !="" || this.usernameToBeSet !== null){
      console.log(this.usernameToBeSet);
      this.user.username = this.usernameToBeSet;
      this.userService.updateUser(this.user.userID,this.user).subscribe(row=> console.log(row));
      this.usernameToBeSet = null;
      this.passwordProvided1 = null;
      this.requestResult1 = 'Pomyślnie zmieniono nazwę.'
    }
  }

  changePassword():void{
    if (this.passwordProvided2!==this.user.password){
      this.requestResult1 = 'Podano nieprawidłowe hasło';
    }else if (this.passwordToBeSet1 == '' || this.passwordToBeSet2 ==''){
      this.requestResult1 = 'Wpisz w oba pola hasło';
    }else if ( this.passwordToBeSet1 != this.passwordToBeSet2){
      this.requestResult1 = 'Wpisano różne hasła';
    } else {
      console.log(this.passwordToBeSet1,this.passwordToBeSet2);
      this.user.password = this.passwordToBeSet1;
      this.userService.updateUser(this.user.userID,this.user).subscribe(row=> console.log(row));
      this.passwordToBeSet1 = null;
      this.passwordToBeSet2 = null;
      this.passwordProvided2 = null;
      this.requestResult1 = 'Pomyślnie zmieniono hasło';
    }

  }

  archivingAccount():void{

    if (this.passwordProvided3!==this.user.password || this.passwordProvided4!==this.user.password){
      this.requestResult2 = 'Podano nieprawidłowe hasło';
    }else if (this.passwordProvided3==='' || this.passwordProvided4 ===''){
      this.requestResult2 = 'Wpisz w oba pola hasło';
    }else if ( this.passwordProvided3 != this.passwordProvided4){
      this.requestResult2 = 'Wpisano różne hasła';
    }else if (this.passwordProvided3===this.user.password && this.passwordProvided4===this.user.password) {
      this.user.accountType = "ARCHIVING";
      this.userService.updateUser(this.user.userID,this.user).subscribe( row => {
          console.log(row)
        }
      );

      alert('Dziękujemy za korzystanie z naszej aplikacji :)');
      this.logOut();
    }
  }

  logOut() {
    if(!GuardService.checkAccountTypeGOSC()){
      sessionStorage.clear();
      sessionStorage.setItem('type', "GOSC");
      this.changePath();
    }
  }

  changePath(){
    this.pathRouting = "";
  }

}
