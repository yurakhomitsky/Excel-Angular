import { createReducer, on } from '@ngrx/store';
import * as  RowActions from './row.actions';

export interface RowState {
    value?: number;
    id?: number;
}

export const initialState: RowState = {

};

export const reducer = createReducer(
    initialState,
    on(RowActions.rowResize, (state, { id, value }) => {
        return {
            ...state,
            [id]: value
        };
    }),

);
