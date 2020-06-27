import { AfterViewInit, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, merge, zip, combineLatest, Subscription } from 'rxjs';
import { shareReplay, tap, take } from 'rxjs/operators';
import { ColState } from 'src/app/store/colState/col.reducer';
import { selectColState } from 'src/app/store/colState/col.selectors';
import { DataState } from 'src/app/store/dataState/data.reducer';
import { selectDataState } from 'src/app/store/dataState/data.selectors';
import { RowState } from 'src/app/store/rowState/row.reducer';
import { selectRowState } from 'src/app/store/rowState/row.selectors';
import { selectCurrentCellState } from 'src/app/store/selectedCellState/selectedCell.selectors';
import { StylesState } from 'src/app/store/stylesState/styles.reducer';
import { selectStylesState } from 'src/app/store/stylesState/styles.selectors';
import { StoreService } from '../../../services/store.service';
import { SelectedCellState } from '../../../store/selectedCellState/selectedCell.reducer';
import { selectCurrentStyles } from '../../../store/selectedCellState/selectedCell.selectors';
import { DefaultStyles } from '../toolbar/button-style/button-style.interface';
import { selectTitleText } from '../../../store/titleState/title.selectors';
import { ActivatedRoute } from '@angular/router';
import { newTable } from '../../../store/actions/store.actions';
import { storage, storageName } from '../../../utils/utils';

@Component({
    selector: 'app-excel',
    templateUrl: './excel.component.html',
    styleUrls: ['./excel.component.scss'],
})
export class ExcelComponent implements OnInit, AfterViewInit, OnDestroy {

    public formulaDone: any;
    public formulaTextContent: string;
    public stylesFromToolBar: object;
    public defaultyStyles: DefaultStyles;

    public colWidthFromState: Observable<ColState> = this.storeService.select(selectColState).pipe(shareReplay(1));
    public rowHeightFromState: Observable<RowState> = this.storeService.select(selectRowState).pipe(shareReplay(1));
    public dataCellsFromState: Observable<DataState> = this.storeService.select(selectDataState).pipe(take(1));
    public tableCellTextContent: Observable<SelectedCellState> = this.storeService.select(selectCurrentCellState).pipe(shareReplay(1));
    public stylesFromState: Observable<StylesState> = this.storeService.select(selectStylesState).pipe(shareReplay(1));
    public currentStyles: Observable<SelectedCellState> = this.storeService.select(selectCurrentStyles);
    public titleTextFromState: Observable<string> = this.storeService.select(selectTitleText);
    public colWidthAndRowHeightFromState: Observable<[ColState, RowState]> = combineLatest(this.colWidthFromState, this.rowHeightFromState);

    private routeSub: Subscription;
    constructor(private changeDetector: ChangeDetectorRef, private storeService: StoreService, private route: ActivatedRoute) { }

    ngOnInit() {
      this.routeSub = this.route.params.subscribe(({id}) => {
                this.storeService.dispatch(newTable({
                    link: storageName(id)
                }));
        });
    }
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
    ngAfterViewInit(): void {
        this.changeDetector.detectChanges();
    }
    onFormulaDone($event?: any): void {
        this.formulaDone = $event;
    }
    onFormulaTextChange(textContent: string): void {
        this.formulaTextContent = textContent;
    }

    onAppliedStyles(styles) {
       this.stylesFromToolBar = styles;
    }
}
