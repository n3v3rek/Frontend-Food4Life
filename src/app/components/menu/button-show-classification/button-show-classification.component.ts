import { Component, OnInit } from '@angular/core';
import {GuardService} from '../../../guard/guard.service';

@Component({
  selector: 'app-button-show-classification',
  templateUrl: './button-show-classification.component.html',
  styleUrls: ['./button-show-classification.component.css']
})
export class ButtonShowClassificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }
}
