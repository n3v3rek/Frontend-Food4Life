import {User} from '../UserModel/userModel';

export class Measurement {
    measurementID: number;
    weight: number;
    hipSize: number;
    waistSize: number;
    bicepsCircumference: number;
    chestCircumference: number;
    thighCircumference: number;
    calfCircumference: number;
    creationDate: any = new Date();
    growth: number;
    description: string;
    user: User;
  }


