import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { changeTitle } from '../../../store/titleState/title.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnChanges {

  constructor(private storeService: StoreService, private route: ActivatedRoute, private router: Router) { }
  @Input() titleText: string;
  routeSub: Subscription;
  id: any;

  ngOnChanges(changes: SimpleChanges) {

    const { titleText } = changes;
    this.titleText = titleText.currentValue;

  }
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(({ id }) => {
      this.id = id;
    });
  }
  onInput(target) {
    this.storeService.dispatch(changeTitle({
      titleText: target.value
    }));
  }
  onDelete() {
    const desicion = confirm('Are you sure want to delete this table?');
    if (desicion) {
      console.log(localStorage.getItem('excel:' + this.id));
      localStorage.removeItem('excel:' + this.id);
      this.router.navigate(['dashboard']);
    }
  }
}
