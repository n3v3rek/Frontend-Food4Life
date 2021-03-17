import { Component, OnInit } from '@angular/core';
import {MeasurementService} from '../Model/MeasurementModel/measurement.service';
import {Measurement} from '../Model/MeasurementModel/measurementModel';
import {User} from '../Model/UserModel/userModel';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.css']
})
export class AddMeasurementComponent implements OnInit {

  user: User;
  measurement: Measurement;

  constructor(private measurementService: MeasurementService) { }

  ngOnInit(): void {
    this.measurement = new Measurement();
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  /* Przerzucić elementy tworzone na backend, zeby zmniejszyc JSON'a */
  addNewMeasurement() {
    this.measurement.creationDate = new Date();
    this.measurementService.createMeasurement(this.measurement,this.user.userID).subscribe(
      row => console.log(row), row => console.log(row)
    );
    this.measurement = new Measurement();
  }

}
