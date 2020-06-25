// tslint:disable:max-line-length
import { createReducer, on } from '@ngrx/store';
import * as SelectedCellActions from './selectedCell.actions';
import * as DataActions from '../dataState/data.actions';
import * as StylesState from '../stylesState/styles.actions';
import { DefaultStyles } from '../../excel/components/toolbar/button-style/button-style.interface';
export interface SelectedCellState {
    id?: string;
    textContent?: string;
    currentStyles?: DefaultStyles;
}

export const initialState: SelectedCellState = {

};

export const reducer = createReducer(
    initialState,

    on(SelectedCellActions.selectedCell, (state, { id, textContent, styles }) => ({ ...state, id, textContent, currentStyles: { ...state.currentStyles, ...styles} })),
    on(DataActions.changeText, (state, {id, textContent }) => ({...state, textContent})),
    on(StylesState.apllyStylesForSelected, (state, action) => {
        return {
            ...state,
            currentStyles: {
                ...state.currentStyles,
                ...action.styles,
            }
        };
    }),
);


