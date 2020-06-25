import { createSelector } from '@ngrx/store';
import { selectExcelState } from '../selectors/store.selectors';

export const selectDataState = createSelector(
    selectExcelState,
    state => state.dataState
);
