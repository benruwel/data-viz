import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chartjs/line-chart/chart.component';
import { D3BarChartComponent } from './d3/d3-bar-chart/d3-bar-chart.component';
import { BarChartComponent } from './chartjs/bar-chart/bar-chart.component';
import { PieChartComponent } from './chartjs/pie-chart/pie-chart.component';
import { ScatterComponent } from './chartjs/scatter/scatter.component';

const routes: Routes = [
  { path: '', component: ChartComponent },
  { path: 'bars', component: BarChartComponent },
  { path: 'pie', component: PieChartComponent },
  { path: 'scatter', component: ScatterComponent },
  { path: 'd3-bar', component: D3BarChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
