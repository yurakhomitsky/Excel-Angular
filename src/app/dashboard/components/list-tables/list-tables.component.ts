import { Component, OnInit, Input } from '@angular/core';
import { ExcelTable } from '../../../utils/utils';

@Component({
  selector: 'app-list-tables',
  templateUrl: './list-tables.component.html',
  styleUrls: ['./list-tables.component.scss']
})
export class ListTablesComponent implements OnInit {
  @Input() tables: ExcelTable;
  constructor() { }

  ngOnInit() {
  }

}
