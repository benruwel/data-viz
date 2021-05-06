import { Injectable } from '@angular/core';
import { Revenue, dateStrings } from './revenue';

@Injectable()
export class RevenueService {
  constructor() {}

  static getRandomArbitrary(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  getRevenueData(): Revenue[] {
    const dateValues: string[] = dateStrings;
    const randomizedValues: Revenue[] = [];
    dateValues.forEach((item) => {
      const revenueObj: Revenue = {
        amount: RevenueService.getRandomArbitrary(2500, 100000),
        date: new Date(item),
      };
      randomizedValues.push(revenueObj);
    });
    return randomizedValues;
  }
}
