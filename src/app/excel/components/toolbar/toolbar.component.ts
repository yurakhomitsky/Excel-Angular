import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonStyle, DefaultStyles } from './button-style/button-style.interface';
import { defaultyStyles } from '../../../constants';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnChanges {

    @Input() defaultStyles: DefaultStyles = defaultyStyles;

    @Output() appliedStyles = new EventEmitter();

    public buttons: ButtonStyle[] = [];

    toButton(defaultStyles): ButtonStyle[] {
        return [
            {
                icon: 'format_align_left',
                active: defaultStyles.textAlign === 'left',
                value: {
                    textAlign: 'left',
                }
            },
            {
                icon: 'format_align_center',
                active: defaultStyles.textAlign === 'center',
                value: {
                    textAlign: 'center',
                }
            },
            {
                icon: 'format_align_right',
                active: defaultStyles.textAlign === 'right',
                value: {
                    textAlign: 'right',
                }
            },
            {
                icon: 'format_bold',
                active: defaultStyles.fontWeight === 'bold',
                value: {
                    fontWeight: defaultStyles.fontWeight === 'bold' ? 'normal' : 'bold',
                }
            },
            {
                icon: 'format_italic',
                active: defaultStyles.fontStyle === 'italic',
                value: {
                    fontStyle: defaultStyles.fontStyle === 'italic' ? 'normal' : 'italic',
                }
            },
            {
                icon: 'format_underline',
                active: defaultStyles.textDecoration === 'underline',
                value: {
                    textDecoration: defaultStyles.textDecoration === 'underline' ? 'none' : 'underline',
                }
            },
        ];
    }

    constructor() { }
    ngOnChanges({defaultStyles: styles}: SimpleChanges) {
        this.defaultStyles = {...this.defaultStyles, ...styles.currentValue};
        this.buttons = this.toButton(this.defaultStyles);
    }
    ngOnInit() {
        this.buttons = this.toButton(this.defaultStyles);
    }

    onStyle(buttonStyle: ButtonStyle) {
        const { value } = buttonStyle;
        this.appliedStyles.emit(value);

    }
}
