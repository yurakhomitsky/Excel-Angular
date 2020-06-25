import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as StoreActions from '../actions/store.actions';



@Injectable()
export class StoreEffects {

  // loadStores$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(StoreActions.loadStores),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => StoreActions.loadStoresSuccess({ data })),
  //         catchError(error => of(StoreActions.loadStoresFailure({ error }))))
  //     )
  //   );
  // });



  constructor(private actions$: Actions) {}

}
