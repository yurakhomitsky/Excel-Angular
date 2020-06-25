import { createAction, props } from '@ngrx/store';



export const rowResize = createAction(
    '[TABLE] Row Resize',
    props<{ id: number, value: number }>()
);

