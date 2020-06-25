import { createAction, props } from '@ngrx/store';

export const changeTitle = createAction(
    '[HEADER] Changed Title',
    props<{titleText: string}>()
);
