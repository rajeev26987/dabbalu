import  { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-myhome',
  templateUrl: 'myhome.html'
})
export class MyhomePage {
  currDate: number;
  constructor(public navCtrl: NavController, private appService: AppProvider) {
    let curDateObj = new Date();
  //  this.currDate = this.formatDate(curDateObj);
    this.currDate = 20180924;
  }
  goToMenu() {
    this.navCtrl.push(HomePage);
  }

  getScheduleItemsLenForDate() {
    return this.appService.getScheduleItemsLenForDate(this.currDate);
  }
  groupScheduledItemsForDate() {
   return  this.appService.groupScheduledItemsForDate(this.currDate);

  }
  formatDate(date) {
    return this.appService.formatDate(date);
  }
  showDateStr() {
    return this.appService.showDateStr(this.currDate);
  }
  scheduledItemPrice() {
    return this.appService.scheduledItemPrice(this.currDate);
  }
  discountOnScheduledItem() {
    return this.appService.discountOnScheduledItem(this.currDate);
  }
  taxOnScheduledItem() {
    return this.appService.taxOnScheduledItem(this.currDate);
  }

  delieveryChargeOnScheduledItem() {
    return this.appService.delieveryChargeOnScheduledItem();
  }
  scheduledItemPriceTotal() {
    return this.appService.scheduledItemPriceTotal(this.currDate);
  }


}
