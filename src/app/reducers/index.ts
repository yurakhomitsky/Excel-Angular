import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';


export interface AppState { }

export const reducers: ActionReducerMap<AppState> = {

};
export function log(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: Action): AppState => {
    console.log('State:', state, 'Action: ', action);
    return reducer(state, action);
  };
}
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['excel'],
    rehydrate: true,
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [ localStorageSyncReducer];
