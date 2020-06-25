import { createAction, props } from '@ngrx/store';
import { DefaultStyles } from '../../excel/components/toolbar/button-style/button-style.interface';

export const apllyStylesForSelected = createAction(
    '[TABLE] Applied Styles',
    props<{ids: string[], styles: DefaultStyles}>()
);
