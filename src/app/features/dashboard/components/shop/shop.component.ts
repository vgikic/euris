import { Component, OnInit } from '@angular/core';
import StoreData from 'src/app/core/models/store-data';
import { EurisApiService } from 'src/app/core/services/euris-api.service';

@Component({
  selector: 'euris-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private eurisApiService: EurisApiService) { }

  public store: StoreData;
  public isPanelOpen = false;

  ngOnInit(): void {
    this.eurisApiService.getDefaultStore().subscribe(store => {
      this.store = store;
      this.isPanelOpen = true;
    });
  }

}
