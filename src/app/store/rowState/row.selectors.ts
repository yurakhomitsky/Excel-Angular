import { selectExcelState } from '../selectors/store.selectors';
import { createSelector } from '@ngrx/store';


export const selectRowState = createSelector(
    selectExcelState,
    state => state.rowState
);
