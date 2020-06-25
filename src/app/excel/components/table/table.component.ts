import {
    AfterViewChecked, AfterViewInit,
    ChangeDetectionStrategy,
    Component,

    HostListener,
    Input,
    OnChanges,
    OnInit,

    QueryList,


    Renderer2, SimpleChanges,
    ViewChildren
} from '@angular/core';
import { defaultyStyles } from '../../../constants';
import { StoreService } from '../../../services/store.service';
import { ColState } from '../../../store/colState/col.reducer';
import { changeText } from '../../../store/dataState/data.actions';
import { DataState } from '../../../store/dataState/data.reducer';
import { RowState } from '../../../store/rowState/row.reducer';
import { selectedCell } from '../../../store/selectedCellState/selectedCell.actions';
import { apllyStylesForSelected } from '../../../store/stylesState/styles.actions';
import { StylesState } from '../../../store/stylesState/styles.reducer';
import { parseId } from '../../../utils/utils';
import { CODES, DEFAULT_HEIGHT, DEFAULT_WIDTH, MAX_ROW } from './table.constants';
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
    @Input() colWidthFromState: ColState;
    @Input() rowHeightFromState: RowState;
    @Input() dataCellsFromState: DataState;
    @Input() stylesFromState: StylesState;
    // @Input() colWidthAndRowHeightFromState: [ColState, RowState];

    @Input() formulaInput: string;
    @Input() formulaDone: any;
    @Input() stylesFromToolbar: object;

    @ViewChildren('cell') cellsView: QueryList<any>;
    public selectedCell = null;
    public groupCells = [];

    constructor(private storeService: StoreService, private render: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.onChangesHandler(changes);
    }

    ngOnInit() {

        this.cols = new Array(this.colsCount)
            .fill('')
            .map(this.toChar, this);

        this.cells = new Array(this.colsCount)
            .fill('');
    }


    ngAfterViewInit() {
        this.select(this.cellsView.first.nativeElement);
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
            const { nativeElement: $next } = this.cellsView.find(({ nativeElement }) => {
                return this.getDatasetid(nativeElement) === nextSelector(key, id);
            });
            this.select($next);
        }
    }
    @HostListener('input', ['$event.target'])
    onInput(target) {
        this.updateTextInStore(target.textContent);
    }

    private updateTextInStore(text: string) {
        this.storeService.dispatch(changeText({
            id: this.getDatasetid(this.selectedCell),
            textContent: text.trim(),
        }));
    }

    selectGroup(cells) {
        this.groupCells = [...cells];
    }

    select(cell, ) {
        if (this.getDatasetid(this.selectedCell) !== this.getDatasetid(cell)) {

            this.groupCells = [];
            this.selectedCell = cell;
            this.selectedCell.focus();

            const styles = this.getStyles(cell, Object.keys(defaultyStyles));

            this.storeService.dispatch(selectedCell({
                id: this.getDatasetid(this.selectedCell),
                textContent: this.selectedCell.textContent,
                styles
            }));

            this.groupCells.push(this.getDatasetid(this.selectedCell));
        }

    }

    public toChar(_, index: number): string {
        return String.fromCharCode(this.CODES.A + index);
    }
    public getDatasetid(element): string {
        return element && element.dataset.id;
    }

    getHeight(rowState: RowState, index: number) {
        return (rowState[index] || DEFAULT_HEIGHT) + 'px';
    }
    getWidth(colState: ColState, index: number) {
        return (colState[index] || DEFAULT_WIDTH) + 'px';
    }

    getText(dataState: DataState, id: string) {
        return (dataState[id] || '');
    }
    getStyleObject(styles: StylesState, id: string) {
        return (styles[id] || defaultyStyles);
    }
    applyStyle(colstate: ColState, stylesState: StylesState, index: number, id: string, cell) {
        const styleObj = this.getStyleObject(stylesState, id);

        return {
            ...defaultyStyles,
            ...styleObj,
            width: this.getWidth(colstate, index)
        };

    }
    private getStyles(element, styles = []) {
        return styles.reduce((acc, style) => {
            acc[style] = element.style[style];
            return acc;
        }, {});
    }
    private onChangesHandler(changes: SimpleChanges) {
        const onFormulaInput = (formulaInput) => {
            if (this.selectedCell && formulaInput) {
                this.selectedCell.textContent = `${formulaInput.currentValue}`;
                this.updateTextInStore(`${formulaInput.currentValue}`);
            }
        };
        const onFormulaDone = (formulaDone) => {
            if (this.formulaDone && formulaDone) {
                this.selectedCell.focus();
            }
        };
        const onStylesFromToolbar = (stylesFromToolbar) => {
            if (stylesFromToolbar) {
                this.storeService.dispatch(apllyStylesForSelected({
                    ids: [...this.groupCells],
                    styles: stylesFromToolbar.currentValue
                }));
            }
        };

        const onColWidthFromState = (colWidthFromState) => {
            if (colWidthFromState) {
                this.colWidthFromState = colWidthFromState.currentValue;
            }
        };

        const onRowHeightFromState = (rowHeightFromState) => {
            if (rowHeightFromState) {
                this.rowHeightFromState = rowHeightFromState.currentValue;
            }
        };
        const onDataCellsFromState = (dataCellsFromState) => {
            if (dataCellsFromState) {
                this.dataCellsFromState = dataCellsFromState.currentValue;
            }
        };

        const onStylesFromState = (stylesFromState) => {
            if (stylesFromState) {
                this.stylesFromState = stylesFromState.currentValue;
            }
        };
        const onColWidthAndRowHeightFromState = ({ currentValue }) => {
            const [colState, rowState] = currentValue;
        };
        const onDefault = () => new Error('lox');
        const changesEvents = {
            formulaInput: onFormulaInput,
            formulaDone: onFormulaDone,
            stylesFromToolbar: onStylesFromToolbar,
            colWidthFromState: onColWidthFromState,
            rowHeightFromState: onRowHeightFromState,
            dataCellsFromState: onDataCellsFromState,
            stylesFromState: onStylesFromState,
            colWidthAndRowHeightFromState: onColWidthAndRowHeightFromState,
            default: onDefault,
        };
        Object.keys(changes).forEach((key) => {
            (changesEvents[key] || changesEvents.default)(changes[key]);
        });
    }

}
