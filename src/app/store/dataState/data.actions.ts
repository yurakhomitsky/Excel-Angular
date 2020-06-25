import { createAction, props } from '@ngrx/store';

export const changeText = createAction(
    '[TABLE] Change text',
    props<{id: string, textContent: any}>()
);
