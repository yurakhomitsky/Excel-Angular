export function resizeHander($root) {
    this.parentNode = $root.closest('[data-type="resizable"]');
    this.parentCoords = this.parentNode.getBoundingClientRect();

    this.setStyle({
      opacity: 1,
      bottom: '-5000px'
    });

    this.listenerMoveFn = this.renderer.listen(document, 'mousemove', (event) => {
      const delta = event.pageX - this.parentCoords.right;
      this.value = this.parentCoords.width + delta;
      this.renderer.setStyle(this.element.nativeElement, 'right', -delta + 'px');
    });


    this.listenerUpFn = this.renderer.listen(document, 'mouseup', () => {
      this.listenerMoveFn();
      this.listenerUpFn();

      this.setStyle({ width: this.value + 'px' }, this.parentNode);

      this.movedColumn.emit({
        column: +this.parentNode.dataset.col,
        value: this.value,
      });
      this.setStyle({
        opacity: 0,
        bottom: 0,
        right: 0
      });
    });
}