import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  walletBal: number;
  outstandBal: number;
  constructor(public navCtrl: NavController, public appService: AppProvider) {
    this.walletBal = 0;
    this.outstandBal = 50;
  }
  getAllScheduleItemPrice() {
    return this.appService.getAllScheduleItemPrice();
  }
  getNextScheduleItemDatePrice() {
    return this.appService.getNextScheduleItemDatePrice();
  }

  getOutstandingBal() {
    return Number(this.outstandBal);
  }
  getWalletBal() {
    return Number(this.walletBal);
  }
  getNextScheduleItemDatePay() {
    let obj = this.getNextScheduleItemDatePrice();
    if (obj[0] == 0) {
      return  0;
    }
    else {
      let d = obj[0], p = Number(obj[1]);
      p = p - this.getWalletBal() + this.getOutstandingBal();
      if (p <= 0) {
        p = 0;
      }
      return p;
    }
  }
  
  getAllScheduleItemPay() {
    let p = this.getAllScheduleItemPrice() - this.getWalletBal() + this.getOutstandingBal();
    if (p <= 0) {
      p = 0;
    }
      return p;
  }


}
