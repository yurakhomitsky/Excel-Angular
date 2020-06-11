import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelModule } from './excel/excel.module';
import { FakeArrayPipe } from './pipes/fake-array.pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExcelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
