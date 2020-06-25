import { selectExcelState } from '../selectors/store.selectors';
import { createSelector } from '@ngrx/store';


export const selectCurrentCellState = createSelector(
    selectExcelState,
    state => state.selectedCellState
);

export const selectTextContent = createSelector(
    selectCurrentCellState,
    state => state.textContent
);
export const selectCurrentStyles = createSelector(
    selectCurrentCellState,
    state => state.currentStyles
);
