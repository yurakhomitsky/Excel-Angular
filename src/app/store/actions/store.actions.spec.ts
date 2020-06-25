import * as fromStore from './store.actions';

describe('loadStores', () => {
  it('should return an action', () => {
    expect(fromStore.loadStores().type).toBe('[Store] Load Stores');
  });
});
