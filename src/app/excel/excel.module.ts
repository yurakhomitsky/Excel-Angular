import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelRoutingModule } from './excel-routing/excel-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormulaComponent } from './components/formula/formula.component';
import { TableComponent } from './components/table/table.component';
import { ExcelComponent } from './components/excel/excel.component';
import { FakeArrayPipe } from '../pipes/fake-array.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
    ExcelComponent,
    FakeArrayPipe
  ],
  imports: [
    CommonModule,
    ExcelRoutingModule,
  ],
  exports: [ExcelRoutingModule]
})
export class ExcelModule { }
