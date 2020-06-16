import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResizeDirective } from '../directives/resize.directive';
import { FakeArrayPipe } from '../pipes/fake-array.pipe';
import { ExcelComponent } from './components/excel/excel.component';
import { FormulaComponent } from './components/formula/formula.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ExcelRoutingModule } from './excel-routing/excel-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
    ExcelComponent,
    FakeArrayPipe,
    ResizeDirective,
  ],
  imports: [
    CommonModule,
    ExcelRoutingModule,
  ],
  exports: [ExcelRoutingModule]
})
export class ExcelModule { }
