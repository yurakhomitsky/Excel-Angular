import { createReducer, on } from '@ngrx/store';
import * as StylesActions from './styles.actions';
import { DefaultStyles } from '../../excel/components/toolbar/button-style/button-style.interface';
export interface StylesState {
    id?: string;
    currentStyles?: DefaultStyles;
}

export const initialState: StylesState = {

};

export const reducer = createReducer(
    initialState,
    on(StylesActions.apllyStylesForSelected, (state, { ids, styles }) => {
       const newState = ids.reduce((acc, id) => {
           acc[id] = {
               ...state[id],
               ...styles
           };
           return acc;
       }, {});
       return {
           ...state,
           ...newState,
       };
    })
);
