import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelComponent } from '../components/excel/excel.component';



const routes: Routes = [
  {
    path: '', redirectTo: '/excel', pathMatch: 'full',
  },
  {
    path: 'excel', component: ExcelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcelRoutingModule { }
