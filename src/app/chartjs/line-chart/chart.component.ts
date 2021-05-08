import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color } from 'ng2-charts';
import { RevenueService } from '../../services/revenue.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  private lineChartDataSubj: BehaviorSubject<
    ChartDataSets[]
  > = new BehaviorSubject<ChartDataSets[]>([]);
  lineChartData$: Observable<
    ChartDataSets[]
  > = this.lineChartDataSubj.asObservable();
  private lineChartLabelsSubj: BehaviorSubject<Date[]> = new BehaviorSubject<
    Date[]
  >([]);
  lineChartLabels$: Observable<any[]> = this.lineChartLabelsSubj.asObservable();
  private chartTypeSubj: BehaviorSubject<ChartType> = new BehaviorSubject<ChartType>(
    'line'
  );
  chartType$: Observable<ChartType> = this.chartTypeSubj.asObservable();

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onResize(newSize): void {
      const chartObj: any = this;
      if (newSize.width > 700) {
        chartObj.scales.yAxes.forEach((item) => {
          item.ticks.display = true;
        });
        chartObj.scales.xAxes.forEach((item) => {
          item.ticks.display = true;
        });
      }
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontFamily: "'Poppins', sans-serif",
            display: false,
            fontColor: '#1C2647',
          },
          type: 'linear',
          scaleLabel: {
            display: true,
            labelString: 'Revenue in KES',
            fontFamily: "'Poppins', sans-serif",
            fontColor: '#1C2647',
            fontSize: 14,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontFamily: "'Poppins', sans-serif",
            display: false,
            fontColor: '#1C2647',
          },
          type: 'time',
          scaleLabel: {
            display: true,
            labelString: 'Time',
            fontFamily: "'Poppins', sans-serif",
            fontColor: '#1C2647',
            fontSize: 16,
          },
          time: {
            unit: 'day',
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      // dark grey
      borderColor: '#D6D8E3',
      pointBackgroundColor: '#1C2647',
      pointBorderColor: '#1C2647',
      pointHoverBackgroundColor: '#FBDC0D',
      pointHoverBorderColor: 'rgba(0,0,0,0.8)',
      pointStyle: 'circle',
      pointRadius: 2.5,
      pointHoverRadius: 5,
      pointBorderWidth: 1,
    },
    {
      // red
      borderColor: '#7E84AD',
      pointBackgroundColor: '#1C2647',
      pointBorderColor: '#1C2647',
      pointHoverBackgroundColor: '#FBDC0D',
      pointHoverBorderColor: 'rgba(0,0,0,0.8)',
      pointStyle: 'circle',
      pointRadius: 2.5,
      pointHoverRadius: 5,
      pointBorderWidth: 1,
    },
  ];
  public chartDefaults;
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  showOnline = true;
  showInStore = true;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private revenueSevice: RevenueService) {}

  ngOnInit(): void {
    const onlineData: ChartDataSets = {
      data: this.revenueSevice.getRevenueData().map((item) => item.amount),
      label: 'Online',
      borderColor: 'blue',
      fill: false,
      type: 'line',
      lineTension: 0,
    };
    const inStoreDate: ChartDataSets = {
      data: this.revenueSevice.getRevenueData().map((item) => item.amount),
      label: 'In Store',
      borderColor: 'green',
      fill: false,
      lineTension: 0,
    };
    const dataSets = [onlineData, inStoreDate];
    this.lineChartDataSubj.next(dataSets);
    this.lineChartLabelsSubj.next(
      this.revenueSevice.getRevenueData().map((item) => item.date)
    );
  }

  ngAfterViewInit(): void {
    this.showOnline = !this.chart.isDatasetHidden(0);
    this.showInStore = !this.chart.isDatasetHidden(1);
  }

  onSelect(event: any): void {
    const days = event.target.value as number;
    console.log(days);
    // refactor this to correct time
    const today = new Date('Tue, 29 Jun 2021 21:00:00 GMT');
    const startDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    const onlineDataCurr = this.lineChartDataSubj
      .getValue()
      .filter((item) => item.label === 'Online');
    const inStoreDataCurr = this.lineChartDataSubj
      .getValue()
      .filter((item) => item.label === 'In Store');
    this.filterLabels(startDate, today);
  }

  onChartSelect(event: any): void {
    const type = event.target.value;
    this.chartTypeSubj.next(type);
  }

  toggleOnline(): void {
    const isHidden = this.chart.isDatasetHidden(0);
    this.chart.hideDataset(0, !isHidden);
    this.showOnline = !this.chart.isDatasetHidden(0);
  }

  toggleInStore(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
    this.showInStore = !this.chart.isDatasetHidden(1);
  }

  private filterLabels(startDate: Date, today: Date): void {
    this.lineChartLabelsSubj.next(
      this.revenueSevice.getRevenueData().map((item) => item.date)
    );
    const currLabels = this.lineChartLabelsSubj.getValue();
    const startTime = startDate.getTime();
    const todayTime = today.getTime();
    const newLabels = currLabels.filter((item) => {
      const time = new Date(item).getTime();
      return startTime < time && time < todayTime;
    });
    this.lineChartLabelsSubj.next(newLabels);
  }
}
