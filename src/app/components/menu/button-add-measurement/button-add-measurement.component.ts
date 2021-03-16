import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-add-measurement',
  templateUrl: './button-add-measurement.component.html',
  styleUrls: ['./button-add-measurement.component.css']
})
export class ButtonAddMeasurementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkAccess(){
    return GuardService.checkAccountTypeGOSC();
  }
}
