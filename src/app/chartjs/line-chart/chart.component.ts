import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { RevenueService } from '../../services/revenue.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Revenue } from '../../services/revenue';

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
    layout: {
      padding: 16,
    },
    plugins: {
      filler: {
        propagate: true,
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
          ticks: { fontFamily: "'Poppins', sans-serif" },
          type: 'time',
          scaleLabel: {
            display: true,
            labelString: 'Time',
            fontFamily: "'Poppins', sans-serif",
            fontSize: 22,
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
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
    };
    const inStoreDate: ChartDataSets = {
      data: this.revenueSevice.getRevenueData().map((item) => item.amount),
      label: 'In Store',
      borderColor: 'green',
      fill: false,
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
