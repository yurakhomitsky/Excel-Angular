import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { changeTitle } from '../../../store/titleState/title.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor(private storeService: StoreService) { }
  @Input() titleText: string;

  ngOnChanges(changes: SimpleChanges) {

    const { titleText } = changes;
    this.titleText = titleText.currentValue;

  }
  ngOnInit() {
  }
  onInput(target) {
    this.storeService.dispatch(changeTitle({
      titleText: target.value
    }));
  }

}
