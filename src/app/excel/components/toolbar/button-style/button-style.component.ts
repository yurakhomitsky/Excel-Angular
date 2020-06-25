import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ButtonStyle, AppliedStyle } from './button-style.interface';

@Component({
  selector: 'app-button-style',
  template: `
      <div class="button" [ngClass]="{'active': button.active}" (click)="onClick($event)">
        <span class="material-icons">
            {{button.icon}}
        </span>
      </div>
  `,
  styleUrls: ['./button-style.scss'],
})
export class ButtonStyleComponent implements OnInit {


  @Input() button: ButtonStyle;
  @Output() appliedStyle: EventEmitter<ButtonStyle> = new EventEmitter<ButtonStyle>();

  constructor() { }

  onClick(event) {
    this.appliedStyle.emit(this.button);
  }

  ngOnInit() {
  }

}
