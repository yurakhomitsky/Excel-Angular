import { createAction, props } from '@ngrx/store';
import { DefaultStyles } from '../../excel/components/toolbar/button-style/button-style.interface';

export const selectedCell = createAction(
    '[TABLE] Selected Cell',
    props<{ id: string, textContent: string, styles?: DefaultStyles}>()
);

export const changeStyles = createAction(
    '[TABLE] Changed Styles',
    props<DefaultStyles>()
);
