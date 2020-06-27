import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { newTable } from '../../../store/actions/store.actions';
import { getAllKeys, storage, ExcelTable } from '../../../utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public now: string;
  public keys: ExcelTable[];
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.now = Date.now().toString();
    this.keys = getAllKeys().map(key => ({
      id: key,
      state: storage(key)
    } as ExcelTable ));
    console.log(this.keys);
  }

}
