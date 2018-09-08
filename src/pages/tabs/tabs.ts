import { Component } from '@angular/core';

import { AccountPage } from '../account/account';
import { SchedulePage } from '../schedule/schedule';
import { PaymentPage } from '../payment/payment';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SchedulePage;
  tab3Root = PaymentPage;
  tab4Root = AccountPage;

  constructor() {

  }
}
