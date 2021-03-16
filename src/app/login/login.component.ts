import {Component, OnInit} from '@angular/core';
import {UserService} from '../Model/UserModel/user.service';
import {subscribeOn} from 'rxjs/operators';
import {User} from '../Model/UserModel/userModel';
import {Router} from '@angular/router';
import {ButtonLoginComponent} from '../components/banner/buttons-user/button-login/button-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email;
  private password;
  private user: User;

  constructor(private userSerivce: UserService,
              private router: Router,
              private loginComponent: ButtonLoginComponent) {
  }

  ngOnInit(): void {

  }

  setNicknameAndLogin(email: string, password: string): void {
    this.email = email;
    this.password = password;
    console.log(this.password + ' ' + this.email);
    this.loguj(password, email);

  }

  loguj(pass, login) {
    this.userSerivce.getUserByEmail(login).subscribe((row) => {
        this.user = row;
        if (this.password === this.user.password) {
          if (this.user.accountType === 'BANNED') {
            alert('Konto jest zbanowane!');
            this.user.password = '';
            this.user.email = '';
          }else if(this.user.accountType === 'ARCHIVING'){
            alert('Konto zostało zarchwizowane!');
            this.user.password = '';
            this.user.email = '';
          } else {
            sessionStorage.setItem('user', JSON.stringify(this.user));
            sessionStorage.setItem('type', JSON.stringify(this.user.accountType));
            console.log('=============');
            console.log(sessionStorage.getItem('type'));
            this.loginComponent.setMetaDataForLogOut();
            alert('zalogowany');
            this.router.navigate(['']);
          }
        } else {
          alert('Hasło błędne.');
        }
      }, (row) => {
        alert('Bledny email!');
        console.log(row);
      }
    );

  }
}
