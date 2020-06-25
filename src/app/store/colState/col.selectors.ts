import { selectExcelState } from '../selectors/store.selectors';
import { createSelector } from '@ngrx/store';


export const selectColState = createSelector(
    selectExcelState,
    state => state.colState
);
