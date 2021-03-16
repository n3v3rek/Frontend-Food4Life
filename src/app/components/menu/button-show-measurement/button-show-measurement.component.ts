import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-show-measurement',
  templateUrl: './button-show-measurement.component.html',
  styleUrls: ['./button-show-measurement.component.css']
})
export class ButtonShowMeasurementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }
}
