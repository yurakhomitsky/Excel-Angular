import { Injectable } from '@angular/core';
import { ExcelState } from '../store/reducers/store.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(private store: Store<ExcelState>) { }


    public dispatch(action): void {
        this.store.dispatch(action);
    }
    public select(selector): Observable<any> {
        return this.store.pipe(select(selector));
    }
}
