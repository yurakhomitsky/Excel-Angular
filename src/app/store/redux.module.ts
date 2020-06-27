import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducer, Action } from '@ngrx/store';
import * as fromStore from './reducers/store.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreEffects } from './effects/store.effects';
import { ExcelState } from './reducers/store.reducer';
import { storage } from '../utils/utils';


export function localStorageSync(reducer: ActionReducer<ExcelState>): ActionReducer<ExcelState> {
  let stateFromStorage;
  let link;
  return (state: ExcelState, action: any): ExcelState => {
    if (action.type === '[DASHBOARD] Table link') {
      link = action.link;
      stateFromStorage = storage(link);
      if (!stateFromStorage) {
        state = undefined;
        storage(link, state);
      } else {
        state = stateFromStorage;
      }
    }
    if (link) {
      storage(link, state);
    }
    return reducer(state, action);
  };
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers, {
      metaReducers: [localStorageSync]
    }),
    EffectsModule.forFeature([StoreEffects])
  ]
})
export class ReduxModule {
}
