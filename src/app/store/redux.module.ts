import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './reducers/store.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreEffects } from './effects/store.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromStore.storeFeatureKey, fromStore.reducers),
    EffectsModule.forFeature([StoreEffects])
  ]
})
export class ReduxModule { }
