import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { SchedulePage } from '../schedule/schedule';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { MyhomePage } from '../myhome/myhome';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MyhomePage;
  tab2Root = SchedulePage;
  tab3Root = CartPage;
  tab4Root = AccountPage;

  constructor() {

  }
}
