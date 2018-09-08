import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';

@Component({
  selector: 'page-edit-schedule',
  templateUrl: 'edit-schedule.html'
})
export class EditSchedulePage {

  schObj: any;
  iniSchObj: any;
  for_date: number;
  monthNames: string[];
  tax_per: number;
  deliver_ch: number;
  schDelObj: Array<{date: number, sq_id:number, quant:number}>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController, public appService: AppProvider) {
    this.schObj = JSON.parse(JSON.stringify(navParams.get('schObj')));
    this.iniSchObj = JSON.stringify(navParams.get('schObj'));
    console.log("b ss" + JSON.stringify(navParams.get('schObj')));
    console.log("ss item " + JSON.stringify(this.schObj));
    this.schDelObj = [];
    this.for_date = navParams.get('for_date');
    this.tax_per = 0.12;
    this.deliver_ch = 0;
    this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getSecheduleForDeletion() {
    return this.schDelObj;
  }
  getSecheduleForDeletionLen() {
    return this.schDelObj.length;
  }

  updateSchedule() {
    this.appService.updateSchedule(this.schDelObj);
    this.dismiss();
  }

  resetSchedule() {
    this.schObj = JSON.parse(this.iniSchObj);
    this.schDelObj = [];

  }

  getScheduleItemsLenForDate() {
    return this.schObj.length;
  }
  getScheduleItemsForDate() {
    return this.schObj;
  }

  repeatNtimes(n) {
    return Array(Number(n));
  }

  scheduleForDelete(seq) {

    let index = this.schObj.findIndex(function (obj) {
      return (obj.sq_id === seq);
    });

    if (index >= 0) {
      let qt = this.schObj[index].quant;
      if (qt > 1) {
        this.schObj[index].quant--;
      }
      else {
        this.schObj.splice(index, 1);
      }

      let myIndex = this.schDelObj.findIndex(function (obj) {
        return (obj.sq_id === seq);
      });

      if (myIndex >= 0) {
        this.schDelObj[myIndex].quant++;
      }
      else {
        this.schDelObj.push(
          {
            date: this.for_date,
            sq_id: seq,
            quant: 1
          }
        )
      }
      console.log("obj for del " + JSON.stringify(this.schDelObj))
    }
  }

  scheduledItemPrice() {
    let p: number;
    p = 0;
    for (let x of this.getScheduleItemsForDate()) {
      p += (Number(x.price) + Number(x.discount)) * x.quant;
    }
    return Math.round(p);
  }
  scheduledItemPriceAfterDiscount() {
    let p: number;
    p = 0;
    for (let x of this.getScheduleItemsForDate()) {
      p += Number(x.price) * Number(x.quant);
    }
    return Math.round(p);
  }
  discountOnScheduledItem() {
    let p: number;
    p = 0;
    for (let x of this.getScheduleItemsForDate()) {
      p += Number(x.discount) * Number(x.quant);
    }
    return Math.round(p);
  }

  taxOnScheduledItem() {
    return Math.round(this.scheduledItemPriceAfterDiscount() * this.tax_per);
  }
  delieveryChargeOnScheduledItem() {
    return Math.round(this.deliver_ch);
  }

  scheduledItemPriceTotal() {
    return (this.scheduledItemPriceAfterDiscount() + this.taxOnScheduledItem() + this.delieveryChargeOnScheduledItem());
  }

  getCurrentDate() {
    return this.for_date;
  }
  showDateStr() {
    var d = this.for_date + "",
      r = d.substring(6, 8) + " " + this.monthNames[Number(d.substring(4, 6)) - 1];
    return r;
  }
  getPriceBeforeDiscount(price, discount, quant) {
    return (Number(price) + Number(discount)) * Number(quant);
  }


}
