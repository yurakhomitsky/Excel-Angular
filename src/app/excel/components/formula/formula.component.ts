import {
  AfterViewInit, ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaComponent implements OnInit, OnChanges, AfterViewInit {
  @Output() formulaDone = new EventEmitter<void>();
  @Output() formulaTextChange = new EventEmitter<string>();
  @Input() tableInput;

  @ViewChild('input', { static: false }) input: ElementRef;

  constructor(private renderer: Renderer2, private storeService: StoreService) { }

  ngOnChanges({ tableInput }: SimpleChanges): void {

    if (this.input && tableInput) {
      const { textContent } = tableInput.currentValue;
      this.renderer.setProperty(this.input.nativeElement, 'textContent', textContent);
    }
  }
  ngOnInit() { }

  ngAfterViewInit() { }

  onInput(target: any): void {
    this.formulaTextChange.emit(target.textContent.trim());
  }
  onKeyDown($event: any): void {
    const keys = ['Enter', 'Tab'];
    if (keys.includes($event.key)) {
      $event.preventDefault();
      this.formulaDone.emit($event);
    }
  }
}

