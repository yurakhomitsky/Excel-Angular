import { createAction, props } from '@ngrx/store';

export interface IResize {
    id: number;
    value: number;
}

export const colResize = createAction(
    '[TABLE] Column Resize',
    props<{ id: number, value: number}>()
);

