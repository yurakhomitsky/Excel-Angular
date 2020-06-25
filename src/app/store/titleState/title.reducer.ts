import { defaultTitle } from '../../constants';
import { createReducer, on } from '@ngrx/store';
import * as TitleActions from './title.actions';

export interface TitleState {
    titleText: string;
}


export const initialState: TitleState = {
    titleText: defaultTitle
};

export const reducer = createReducer(
    initialState,
    on(TitleActions.changeTitle, (state, { titleText }) => ({ ...state, titleText }))
);

