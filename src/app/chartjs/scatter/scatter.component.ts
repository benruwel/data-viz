import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Label } from 'ng2-charts';
import { ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { PropData } from '../../services/percentage-prop.model';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css'],
})
export class ScatterComponent implements OnInit, AfterViewInit {
  private labelsSubj: BehaviorSubject<Label[]> = new BehaviorSubject<Label[]>(
    []
  );
  labels$: Observable<any[]> = this.labelsSubj.asObservable();
  private dataSubj: BehaviorSubject<ChartDataSets[]> = new BehaviorSubject<
    ChartDataSets[]
  >([]);
  data$: Observable<any[]> = this.dataSubj.asObservable();

  scatterChartLabels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running',
  ];

  chartType: ChartType = 'scatter';

  scatterChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Product page views',
            fontFamily: "'Poppins', sans-serif",
            fontColor: '#1C2647',
            fontSize: 14,
          },
        },
      ],
      xAxes: [
        {
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'Purchases',
            fontFamily: "'Poppins', sans-serif",
            fontColor: '#1C2647',
            fontSize: 14,
          },
        },
      ],
    },
  };

  constructor() {}

  ngOnInit(): void {
    const dataSets: ChartDataSets[] = [
      {
        label: 'Product A',
        backgroundColor: 'rgba(0,255,174,0.53)',
        pointRadius: 10,
        pointBackgroundColor: 'rgba(0,255,174,0.53)',
        data: [
          {
            x: 20,
            y: 56,
          },
          {
            x: 23,
            y: 67,
          },
          {
            x: 31,
            y: 77,
          },
          {
            x: 33,
            y: 100,
          },
          {
            x: 33,
            y: 121,
          },
          {
            x: 44,
            y: 160,
          },
          {
            x: 55,
            y: 187,
          },
          {
            x: 72,
            y: 200,
          },
          {
            x: 45,
            y: 230,
          },
        ],
      },
    ];
    this.dataSubj.next(dataSets);
  }

  ngAfterViewInit(): void {}
}
