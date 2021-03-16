import {Injectable} from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() {
    if(sessionStorage.getItem('type') )
    {
      console.log(sessionStorage.getItem('type'))
    }else{
      sessionStorage.setItem('type', 'GOSC')
    }
  }

  static checkAccountType(): boolean {
    return sessionStorage?.getItem('type').toLocaleUpperCase() == '\"ADMIN\"';
  }

  static checkAccountTypeMODERATOR(): boolean {
    return sessionStorage.getItem('type') === '\"MODERATOR\"';
  }

  static checkAccountTypeGOSC(): boolean {
    return sessionStorage?.getItem('type') == 'GOSC';
  }

}
