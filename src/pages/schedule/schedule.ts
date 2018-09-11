import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { EditSchedulePage } from '../edit-schedule/edit-schedule';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  showDate: Array<number>;
  showAll: number;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public appService: AppProvider) {
    this.showAll = 0;
    this.showDate = [];
  }

  toggleDate(date) {
    let d = Number(date); 
      let index = this.showDate.indexOf(d);
      if (index >= 0) {
        this.showDate.splice(index, 1);
      }
      else {
        this.showDate.push(d);
      }
  }

  showAllDate() {
    this.showAll = 1;
    this.showDate = [];
  }

  hideAllDate() {
    this.showAll = 0;
    this.showDate = [];
  }

  showForDate(date) {
    let d = Number(date);
    let index = this.showDate.indexOf(d);
    return (index >= 0 && this.showAll == 1) || (index < 0 && this.showAll == 0);
  }

  getScheduleItemsForDate(date) {
    return this.appService.getScheduleItemsForDate(date);
  }
  getAllScheduleItems() {
    return this.appService.getAllScheduleItems();
  }
  getAllScheduleItemsLength() {
    return this.appService.getAllScheduleItemsLength();
  }
  groupScheduledItems() {
    let schItem = this.appService.groupScheduledItems();
    if (Array.isArray(schItem) ) {
      schItem.sort(this.compareObj);
    }
    else {
      return schItem;
    }

    return this.appService.groupScheduledItems();
  }
  groupScheduledItemsLength() {
    return this.appService.groupScheduledItemsLength();
  }
  groupScheduledItemsForDate(date) {
    return this.appService.groupScheduledItemsForDate(date);
  }
  getScheduleItemsLenForDate(date) {
    return this.appService.getScheduleItemsLenForDate(date);
  }
  scheduledItemPrice(date) {
    return this.appService.scheduledItemPrice(date);
  }
  discountOnScheduledItem(date) {
    return this.appService.discountOnScheduledItem(date);
  }
  taxOnScheduledItem(date) {
    return this.appService.taxOnScheduledItem(date);
  }
  delieveryChargeOnScheduledItem() {
    return this.appService.delieveryChargeOnScheduledItem();
  }
  scheduledItemPriceTotal(date) {
    return this.appService.scheduledItemPriceTotal(date);
  }
  priceBeforeDiscount(price, discount) {
    return Number(price) + Number(discount);
  }
  getDates() {
    return this.appService.getDates();
  }
  openEditScheduleModal(for_date) {
    
    let schObj = this.getScheduleItemsForDate(for_date);

    console.log("Edit new schedule model date " + for_date);
    console.log("schedule " + schObj);
    let modal = this.modalCtrl.create(EditSchedulePage, { schObj: schObj, for_date: for_date }, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }
  showDateStr(date) {
    return this.appService.showDateStr(date);
  }
  compareObj(a, b) {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }
}
