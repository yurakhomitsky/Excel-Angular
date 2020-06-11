import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public CODES = {
    A: 65,
    Z: 90,
  };
  public cols: Array<any>;
  public colsCount = this.CODES.Z - this.CODES.A + 1;
  public rowsCount = 25;

  constructor() { }

  ngOnInit() {
    // this.cols = new Array(this.colsCount)
    //   .fill('')
    //   .map(this.toChar, this);
  }

  public toChar(index: number): string {
    return String.fromCharCode(this.CODES.A + index);
  }

}
