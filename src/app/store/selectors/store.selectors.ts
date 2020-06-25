import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from '../reducers/store.reducer';

export const selectExcelState = createFeatureSelector<fromStore.ExcelState>(fromStore.storeFeatureKey);
