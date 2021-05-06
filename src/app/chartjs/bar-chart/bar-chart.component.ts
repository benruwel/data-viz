import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color } from 'ng2-charts';
import { RevenueService } from '../../services/revenue.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit, AfterViewInit {
  private barChartDataSubj: BehaviorSubject<
    ChartDataSets[]
  > = new BehaviorSubject<ChartDataSets[]>([]);
  barChartData$: Observable<
    ChartDataSets[]
  > = this.barChartDataSubj.asObservable();
  private barChartLabelsSubj: BehaviorSubject<Date[]> = new BehaviorSubject<
    Date[]
  >([]);
  barChartLabels$: Observable<any[]> = this.barChartLabelsSubj.asObservable();
  private chartTypeSubj: BehaviorSubject<ChartType> = new BehaviorSubject<ChartType>(
    'bar'
  );
  chartType$: Observable<ChartType> = this.chartTypeSubj.asObservable();

  public barChartData: ChartDataSets[] = [];
  public barChartLabels = [];
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
    scales: {
      yAxes: [
        {
          ticks: { fontFamily: "'Poppins', sans-serif" },
          type: 'linear',
          scaleLabel: {
            display: true,
            labelString: 'Revenue in KES',
            fontFamily: "'Poppins', sans-serif",
            fontSize: 22,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            callback: (value, index, values) => {
              const date = new Date(value);
              return `${date.toDateString()}`;
            },
          },
        },
      ],
    },
  };
  public barChartColors: Color[] = [
    {
      // dark grey
      borderColor: 'rgb(15,66,191)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
    },
    {
      // red
      borderColor: 'rgb(56,224,27)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];
  public chartDefaults;
  public barChartLegend = true;
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];
  showOnline = true;
  showInStore = true;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private revenueSevice: RevenueService) {}

  ngOnInit(): void {
    const onlineData: ChartDataSets = {
      data: this.revenueSevice.getRevenueData().map((item) => item.amount),
      label: 'Online',
      fill: true,
      backgroundColor: 'green',
    };
    const inStoreDate: ChartDataSets = {
      data: this.revenueSevice.getRevenueData().map((item) => item.amount),
      label: 'In Store',
      fill: true,
      backgroundColor: 'blue',
    };
    const dataSets = [onlineData, inStoreDate];
    this.barChartDataSubj.next(dataSets);
    this.barChartLabelsSubj.next(
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
    const onlineDataCurr = this.barChartDataSubj
      .getValue()
      .filter((item) => item.label === 'Online');
    const inStoreDataCurr = this.barChartDataSubj
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
    this.barChartLabelsSubj.next(
      this.revenueSevice.getRevenueData().map((item) => item.date)
    );
    const currLabels = this.barChartLabelsSubj.getValue();
    const startTime = startDate.getTime();
    const todayTime = today.getTime();
    const newLabels = currLabels.filter((item) => {
      const time = new Date(item).getTime();
      return startTime < time && time < todayTime;
    });
    this.barChartLabelsSubj.next(newLabels);
  }
}
