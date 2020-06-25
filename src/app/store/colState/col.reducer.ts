import { createReducer, on } from '@ngrx/store';
import * as  ColActions from './col.actions';
export interface ColState {
   value?: number;
   id?: number;
}

export const initialState: ColState = {

};

export const reducer = createReducer(
    initialState,
    on(ColActions.colResize, (state, {id, value}) => {
        return {
            ...state,
            [id]: value
        };
    }),

);
