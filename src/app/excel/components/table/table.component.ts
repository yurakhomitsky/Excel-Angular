import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';

import { parseId } from '../../../utils/utils';
import { CODES, MAX_ROW } from './table.constants';
import { nextSelector } from './table.functions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {

  public CODES = CODES;
  public cols: Array<any>;
  public cells: Array<any>;
  public colsCount = this.CODES.Z - this.CODES.A + 1;
  public rowsCount = MAX_ROW;

  @Input() formulaInput: string;
  @Input() formulaDone: any;
  @Output() tableSelect = new EventEmitter();
  @Output() tableInput = new EventEmitter();
  @ViewChildren('cell') cellsView: QueryList<any>;

  public selectedCell = null;
  public groupCells = [];

  constructor( private render2: Renderer2) { }

  ngOnChanges({formulaInput, formulaDone}: SimpleChanges): void {
    if (this.selectedCell && formulaInput) {
      this.selectedCell.textContent = formulaInput.currentValue;
    }
    if (this.formulaDone) {
      this.selectedCell.focus();
    }
  }

  ngOnInit() {
    this.cols = new Array(this.colsCount)
      .fill('')
      .map(this.toChar, this);

    this.cells = new Array(this.colsCount)
      .fill('');
  }


  ngAfterViewInit() {
    this.selectedCell = this.cellsView.first.nativeElement;
    this.groupCells.push(this.getDatasetid(this.selectedCell));
    this.tableSelect.emit(this.selectedCell);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = parseId(this.selectedCell);
      const {nativeElement: $next} = this.cellsView.find(({ nativeElement }) => {
        return this.getDatasetid(nativeElement) === nextSelector(key, id);
      });
      this.select($next);
    }
  }
  @HostListener('input', ['$event.target'])
  onInput(target) {
    this.tableInput.emit(target.textContent);
  }

  selectGroup(cells) {
    this.groupCells = [...cells];
  }

  select(cell) {
    this.groupCells = [];
    this.selectedCell = cell;
    this.selectedCell.focus();
    this.tableSelect.emit(this.selectedCell);
    this.groupCells.push(this.getDatasetid(this.selectedCell));
  }

  public toChar(_, index: number): string {
    return String.fromCharCode(this.CODES.A + index);
  }
  public getDatasetid(element): string {
    return element && element.dataset.id;
  }
}
