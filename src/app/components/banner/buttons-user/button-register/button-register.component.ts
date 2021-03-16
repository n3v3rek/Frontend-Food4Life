import {Component, OnInit} from '@angular/core';
import {GuardService} from '../../../../guard/guard.service';

@Component({
  selector: 'app-button-register',
  templateUrl: './button-register.component.html',
  styleUrls: ['./button-register.component.css']
})
export class ButtonRegisterComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }
}
