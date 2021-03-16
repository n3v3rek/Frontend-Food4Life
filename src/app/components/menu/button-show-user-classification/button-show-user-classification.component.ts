import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-show-user-classification',
  templateUrl: './button-show-user-classification.component.html',
  styleUrls: ['./button-show-user-classification.component.css']
})
export class ButtonShowUserClassificationComponent implements OnInit {

  constructor(private guardService: GuardService) { }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }
}
