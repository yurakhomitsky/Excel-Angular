import { createReducer, on } from '@ngrx/store';
import * as DataActions from './data.actions';

export interface DataState {
    id?: string;
    textContent?: any;
}

export const initialState: DataState = {

};

export const reducer = createReducer(
    initialState,
    on(DataActions.changeText, (state, { id, textContent}) => {
        return {
            ...state,
            [id]: textContent
        };
    }),
);
