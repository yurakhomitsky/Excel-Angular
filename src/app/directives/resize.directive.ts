import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

import { parseId, range } from '../utils/utils';
import { StoreService } from '../services/store.service';
import { colResize } from '../store/colState/col.actions';
import { rowResize } from '../store/rowState/row.actions';



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
    @Input() selectedCell;
    @Output() cellsToSelect = new EventEmitter<Array<string>>();
    @Output() cellToSelect = new EventEmitter<any>();

    constructor(private element: ElementRef, private renderer: Renderer2, private storeService: StoreService) {
    }

    @HostListener('mousedown', ['$event.target', '$event.target.dataset.resize'])
    onMouseDown(resizer: HTMLElement, dataset) {

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
                    // this.setStyle({ width: this.value + 'px' }, this.parentNode);
                    // this.element.nativeElement.querySelectorAll(`[data-col="${this.parentNode.dataset.col}"]`)
                    //     .forEach(el => el.style.width = this.value + 'px');

                    this.storeService.dispatch(colResize({
                        id: this.parentNode.dataset.col,
                        value: this.value
                    }));

                } else {
                    // this.setStyle({ height: this.value + 'px' }, this.parentNode);

                    this.storeService.dispatch(rowResize({
                        id: this.parentNode.dataset.row,
                        value: this.value
                    }));
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
    @HostListener('click', ['$event', '$event.target'])
    onClick(event, target) {
        if (this.isCell(event)) {
            if (event.shiftKey) {
                const cells = this.matrix(target, this.selectedCell);
                this.cellsToSelect.emit(cells);

            } else {
                this.cellToSelect.emit(target);
            }
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

    private isCell(event) {
        return event.target.dataset.type === 'cell';
    }

    private matrix($target, $current) {
        const target = parseId($target);
        const current = parseId($current);

        const cols = range(current.col, target.col);
        const rows = range(current.row, target.row);
        return cols.reduce((acc, col) => {
            rows.forEach((row) => acc.push(`${row}:${col}`));
            return acc;
        }, []);
    }

}
