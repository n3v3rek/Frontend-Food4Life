import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-show-user',
  templateUrl: './button-show-user.component.html',
  styleUrls: ['./button-show-user.component.css']
})
export class ButtonShowUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountType();
  }
}
