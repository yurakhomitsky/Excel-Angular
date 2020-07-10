import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action,
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import { localStorageSync } from "ngrx-store-localstorage";
import { newTable } from "../store/actions/store.actions";
import { storage } from "../utils/utils";
import { routerReducer } from "@ngrx/router-store";

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];
