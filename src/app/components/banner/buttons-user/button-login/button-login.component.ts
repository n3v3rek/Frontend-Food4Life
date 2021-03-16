import {Component, OnInit} from '@angular/core';
import {GuardService} from '../../../../guard/guard.service';

@Component({
  selector: 'app-button-login',
  templateUrl: './button-login.component.html',
  styleUrls: ['./button-login.component.css']
})
export class ButtonLoginComponent implements OnInit {

   private _pathRouting = 'logowanie';

  constructor() {
  }

  ngOnInit(): void {
  }

  wyloguj() {
    if(!GuardService.checkAccountTypeGOSC()){
      sessionStorage.clear();
      sessionStorage.setItem('type', "GOSC");
      this.setMetaDataForLogIn();
    }
  }

  setMetaDataForLogOut(){
    this._pathRouting = '';
  }

  setMetaDataForLogIn(){
    this._pathRouting = 'logowanie'
  }

  checkAccess(){
    return GuardService.checkAccountTypeGOSC();
  }

  get pathRouting(): string {
    return this._pathRouting;
  }

}
