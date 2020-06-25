import { createSelector } from '@ngrx/store';
import { selectExcelState } from '../selectors/store.selectors';

export const selectStylesState = createSelector(
    selectExcelState,
    state => state.stylesState
);
