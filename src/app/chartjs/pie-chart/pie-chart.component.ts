import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { PropData } from '../../services/percentage-prop.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  private labelsSubj: BehaviorSubject<Label[]> = new BehaviorSubject<Label[]>(
    []
  );
  labels$: Observable<any[]> = this.labelsSubj.asObservable();
  private dataSubj: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    []
  );
  data$: Observable<number[]> = this.dataSubj.asObservable();

  chartType: ChartType = 'doughnut';
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.57)',
        'rgba(0,255,0,0.58)',
        'rgba(0,0,255,0.53)',
        'rgba(0,255,174,0.53)',
      ],
    },
  ];
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  percentProps: PropData[] = [];

  constructor() {}

  ngOnInit(): void {
    const labels = [['Kilimani'], ['CBD'], ['Kiambu Road'], ['Langata']];
    this.labelsSubj.next(labels);
    this.dataSubj.next([600, 210, 80, 189]);
    this.percentProps = [
      { name: 'Kilimani', amount: 600 },
      { name: 'CBD', amount: 210 },
      { name: 'Kiambu Road', amount: 80 },
      { name: 'Langata', amount: 189 },
    ];
  }
}
