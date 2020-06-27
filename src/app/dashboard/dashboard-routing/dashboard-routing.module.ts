import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';




const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
  },
  {
    path: '', pathMatch: 'full', redirectTo: '/dashboard'
  },
  {
    path: '**', redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
