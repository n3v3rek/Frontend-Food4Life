import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-add-plan',
  templateUrl: './button-add-plan.component.html',
  styleUrls: ['./button-add-plan.component.css']
})
export class ButtonAddPlanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }

}
