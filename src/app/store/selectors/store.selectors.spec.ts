import * as fromStore from '../reducers/store.reducer';
import { selectStoreState } from './store.selectors';

describe('Store Selectors', () => {
  it('should select the feature state', () => {
    const result = selectStoreState({
      [fromStore.storeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
