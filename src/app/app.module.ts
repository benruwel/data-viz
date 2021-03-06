import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chartjs/line-chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './chartjs/pie-chart/pie-chart.component';
import { D3BarChartComponent } from './d3/d3-bar-chart/d3-bar-chart.component';
import { RevenueService } from './services/revenue.service';
import { BarChartComponent } from './chartjs/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './chartjs/doughnut-chart/doughnut-chart.component';
import { PercentageRepComponent } from './chartjs/percentage-rep/percentage-rep.component';
import { ScatterComponent } from './chartjs/scatter/scatter.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    PieChartComponent,
    D3BarChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    PercentageRepComponent,
    ScatterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ChartsModule],
  providers: [RevenueService],
  bootstrap: [AppComponent],
})
export class AppModule {}
