import { ActionReducerMap } from '@ngrx/store';
import * as fromColState from '../colState/col.reducer';
import * as fromRowState from '../rowState/row.reducer';
import * as fromDataState from '../dataState/data.reducer';
import * as fromSelectedCellState from '../selectedCellState/selectedCell.reducer';
import * as fromStylesState from '../stylesState/styles.reducer';
import * as fromTitleState from '../titleState/title.reducer';
export const storeFeatureKey = 'excel';

export interface ExcelState {
  titleState: fromTitleState.TitleState;
  colState: fromColState.ColState;
  rowState: fromRowState.RowState;
  dataState: fromDataState.DataState;
  selectedCellState: fromSelectedCellState.SelectedCellState;
  stylesState: fromStylesState.StylesState;
}

export const initialState: ExcelState = {
  titleState: fromTitleState.initialState,
  colState: fromColState.initialState,
  rowState: fromRowState.initialState,
  dataState: fromDataState.initialState,
  selectedCellState: fromSelectedCellState.initialState,
  stylesState: fromStylesState.initialState,
};

export const reducers: ActionReducerMap<ExcelState> = {
  titleState: fromTitleState.reducer,
  colState: fromColState.reducer,
  rowState: fromRowState.reducer,
  dataState: fromDataState.reducer,
  selectedCellState: fromSelectedCellState.reducer,
  stylesState: fromStylesState.reducer,
};

