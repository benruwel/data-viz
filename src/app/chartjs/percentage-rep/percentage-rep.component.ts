import { Component, Input, OnInit } from '@angular/core';
import { PropData } from '../../services/percentage-prop.model';

@Component({
  selector: 'percentage-rep',
  templateUrl: './percentage-rep.component.html',
  styleUrls: ['./percentage-rep.component.css'],
})
export class PercentageRepComponent implements OnInit {
  @Input() propData: PropData[];
  data: DimPercentageVM[] = [];

  constructor() {}

  ngOnInit(): void {
    this.toDimPercent(this.propData);
    this.data.sort((a, b) => {
      return b.percent - a.percent;
    });
  }

  toDimPercent(propInput: PropData[]): void {
    const total: number = propInput
      .map((item) => item.amount)
      .reduce((acc, curr) => acc + curr);
    propInput.forEach((item) => {
      const percent: number = (item.amount * 100) / total;
      this.data.push({
        name: item.name,
        percent,
      });
    });
  }

  getPercentString(percent: number): string {
    const roundedValue = Math.round(percent);
    return `${roundedValue}%`;
  }
}

interface DimPercentageVM {
  name: string;
  percent: number;
}
