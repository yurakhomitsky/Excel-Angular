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
import { newTable } from '../store/actions/store.actions';
import { storage } from '../utils/utils';
import { routerReducer } from '@ngrx/router-store';


export interface AppState { }

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};
export function log(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: Action): AppState => {
    console.log(state);
    return reducer(state, action);
  };
}

export function syncStorage(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: any): AppState => {
    
    return reducer(state, action);
  };
}
export const mergeReducer = (state: AppState, rehydratedState: any, action: any) => {
  let stateFromStorage;
  let link;
  if (action.type === '[DASHBOARD] Table link') {
    link = action.link;
    stateFromStorage = storage(link);
    if (!stateFromStorage) {
      storage(link, state);
      rehydratedState = storage(link);
    }
    state = stateFromStorage;
  }
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {

  return localStorageSync({
    keys: ['excel'],
    rehydrate: true,
    syncCondition: (state) => {
      // console.log('Sync', state);
      return true;
    },
    mergeReducer
  })(reducer);

}
export const metaReducers: MetaReducer<AppState>[] = [];
