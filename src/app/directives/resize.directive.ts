import { Directive, ElementRef, Renderer2, HostListener,} from '@angular/core';


@Directive({
  selector: '[appResize]'
})
export class ResizeDirective {
  private parentNode;
  private parentCoords;
  private value = null;
  private type;
  listenerMoveFn: () => void;
  listenerUpFn: () => void;


  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mousedown', ['$event.target', '$event.target.dataset.resize'])
  onClick(resizer, dataset) {

    if (this.shouldResize(dataset)) {
      this.parentNode = resizer.closest('[data-type="resizable"]');
      this.parentCoords = this.parentNode.getBoundingClientRect();
      this.type = dataset;
      const sideProp = this.type === 'col' ? 'bottom' : 'right';

      this.setStyle({
        opacity: 1,
        [sideProp]: '-5000px'
      },
        resizer);

      this.listenerMoveFn = this.renderer.listen(document, 'mousemove', (event) => {
        if (this.type === 'col') {
          const delta = event.pageX - this.parentCoords.right;
          this.value = this.parentCoords.width + delta;
          this.renderer.setStyle(resizer, 'right', -delta + 'px');
        } else {
          const delta = event.pageY - this.parentCoords.bottom;
          this.value = this.parentCoords.height + delta;
          this.renderer.setStyle(resizer, 'bottom', -delta + 'px');
        }
      });


      this.listenerUpFn = this.renderer.listen(document, 'mouseup', () => {
        this.listenerMoveFn();
        this.listenerUpFn();

        if (this.type === 'col') {
          this.setStyle({ width: this.value + 'px' }, this.parentNode);
          this.element.nativeElement.querySelectorAll(`[data-col="${this.parentNode.dataset.col}"]`)
            .forEach(el => el.style.width = this.value + 'px');
        } else {
          this.setStyle({ height: this.value + 'px' }, this.parentNode);
        }

        this.setStyle({
          opacity: 0,
          bottom: 0,
          right: 0
        },
          resizer);
      });
    }
  }

  private setStyle(styles: object, el): void {
    Object.entries(styles).forEach(([style, value]) => {
      this.renderer.setStyle(el, style, value);

    });

  }
  private shouldResize(event) {
    return event;
  }

}
