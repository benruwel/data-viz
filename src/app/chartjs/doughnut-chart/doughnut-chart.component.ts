import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent implements OnInit {
  private labelsSubj: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  labels$: Observable<any[]> = this.labelsSubj.asObservable();
  private dataSubj: BehaviorSubject<MultiDataSet> = new BehaviorSubject<MultiDataSet>(
    {} as MultiDataSet
  );
  data$: Observable<MultiDataSet> = this.dataSubj.asObservable();

  chartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {}
}
