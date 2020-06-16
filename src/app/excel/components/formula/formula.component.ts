import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaComponent implements OnInit, OnChanges {
  @Output() formulaInput = new EventEmitter<string>();
  @Output() formulaDone = new EventEmitter<void>();
  @Input() tableSelect;
  @Input() tableInput;

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnChanges({ tableSelect, tableInput }: SimpleChanges): void {
    if (this.input) {

      if (tableSelect) {
        this.renderer.setProperty(this.input.nativeElement, 'textContent', tableSelect.currentValue.textContent);
      }
      if (tableInput) {
        this.renderer.setProperty(this.input.nativeElement, 'textContent', tableInput.currentValue);
      }
    }
  }
  ngOnInit() { }

  onInput($event: any): void {
    this.formulaInput.emit($event.textContent);
  }
  onKeyDown($event: any): void {
    const keys = ['Enter', 'Tab'];
    if (keys.includes($event.key)) {
      $event.preventDefault();
      this.formulaDone.emit($event);
    }
  }
}

