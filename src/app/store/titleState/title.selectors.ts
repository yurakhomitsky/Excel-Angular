import { createSelector } from '@ngrx/store';
import { selectExcelState } from '../selectors/store.selectors';

export const selectTitleState = createSelector(
    selectExcelState,
    state => state.titleState
);
export const selectTitleText = createSelector(
    selectTitleState,
    titleState => titleState.titleText
);
