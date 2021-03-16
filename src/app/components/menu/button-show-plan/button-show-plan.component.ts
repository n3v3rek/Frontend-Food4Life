import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-show-plan',
  templateUrl: './button-show-plan.component.html',
  styleUrls: ['./button-show-plan.component.css']
})
export class ButtonShowPlanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }
}
