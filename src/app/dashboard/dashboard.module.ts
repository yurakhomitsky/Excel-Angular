import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing/dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListTablesComponent } from './components/list-tables/list-tables.component';



@NgModule({
  declarations: [DashboardComponent, ListTablesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
