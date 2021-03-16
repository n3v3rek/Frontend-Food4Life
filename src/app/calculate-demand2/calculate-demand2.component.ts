import {Component, OnInit} from '@angular/core';
import {GuardService} from '../guard/guard.service';
import {DietService} from '../Model/DietModel/diet.service';
import {User} from '../Model/UserModel/userModel';
import {Diet} from '../Model/DietModel/dietModel';

@Component({
  selector: 'app-calculate-demand2',
  templateUrl: './calculate-demand2.component.html',
  styleUrls: ['./calculate-demand2.component.css']
})
export class CalculateDemand2Component implements OnInit {

  kilocalorie: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  user: User;

  buttonRequest: string;

  constructor(private demandService: DietService) {
    this.fats = 0;
    this.carbohydrates = 0;
    this.kilocalorie = 0;
    this.proteins = 0;
  }

  ngOnInit(): void {
  }

  calculateDemand(sex: any, age: any, weight: any, height: any, dietCoefficient: any, activityType: any): void {
    if (sex === '2') {
      this.kilocalorie = 1143 + 6.25 * (height - 130) + 10 * (weight - 40) - 5 * (age - 15);
      this.kilocalorie = 1.04 * (this.kilocalorie) + 140 * activityType + 300 * (dietCoefficient-1) ;
    } else {
      this.kilocalorie = 977 + 6.25 * (height - 130) + 10 * (weight - 40) - 5 * (age - 15);
      this.kilocalorie = 1.04 * (this.kilocalorie) + 140 * activityType + 300 * (dietCoefficient-1);
    }
    this.proteins = (0.15 * this.kilocalorie) / 3.86;
    this.carbohydrates = (0.55 * this.kilocalorie) / 4.0;
    this.fats = (0.30 * this.kilocalorie) / 8.98;
  }

  checkAccess() {
    return GuardService.checkAccountTypeGOSC();
  }

  addNewDemand() {
    if(this.kilocalorie != 0) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      let diet: Diet = new Diet();
      diet.user = this.user;
      diet.recommendedFats = this.fats;
      diet.recommendedProteins = this.proteins;
      diet.recommendedCarbohydrates = this.carbohydrates;
      diet.recommendedKilocalories = this.kilocalorie;
      this.demandService.createDiet(diet).subscribe(row => {
        console.log(row);
        this.fats = 0;
        this.carbohydrates = 0;
        this.kilocalorie = 0;
        this.proteins = 0;
        this.buttonRequest = 'Pomyślnie dodano dietę!';
      });
    } else {
      this.buttonRequest = 'Brak jednego z parametrów!';
    }
  }

}
