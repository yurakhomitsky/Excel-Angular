import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StoreEffects } from './store.effects';

describe('StoreEffects', () => {
  let actions$: Observable<any>;
  let effects: StoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(StoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
