import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent implements OnInit, AfterViewInit {

  formulaInput = '';
  formulaDone: any;
  tableSelect: any;
  tableInput = '';
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }
  onFormulaInput($event?: any): void {
    this.formulaInput = $event.trim();
  }
  onFormulaDone($event?: any): void {
     this.formulaDone = $event;
  }
  onTableSelect($event: any): void {
    this.tableSelect = $event;
  }
  onTableInput($event: any): void {
    this.tableInput = $event;
  }
}
