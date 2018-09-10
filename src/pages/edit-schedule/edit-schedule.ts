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
  schDelObj: Array<{ date: number, sq_id: number, quant: number, item: number }>;
  schDelObjList: Array<{ sq_id: number, item: number, item_name: string, price: number, discount: number, discount_per: number, size: string, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string, sub_item: Array<{ item: number, item_name: string, price: number, discount: number, discount_per, number, size: string, quant: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }> }>;




  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController, public appService: AppProvider) {
    this.schObj = JSON.parse(JSON.stringify(navParams.get('schObj')));
    this.iniSchObj = JSON.stringify(navParams.get('schObj'));
    console.log("b ss" + JSON.stringify(navParams.get('schObj')));
    console.log("ss item " + JSON.stringify(this.schObj));
    this.schDelObj = [];
    this.schDelObjList = [];
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

  getSecheduleForDeletionList() {
    return this.schDelObjList;
  }
  getSecheduleForDeletionListLen() {
    return this.schDelObjList.length;
  }

  updateSchedule() {
    this.appService.updateSchedule(this.schDelObj);
    this.dismiss();
  }


  resetSchedule() {
    this.schObj = JSON.parse(this.iniSchObj);
    this.schDelObj = [];
    this.schDelObjList = [];

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
      let schObjIndList = this.schObj[index];
      let qt = schObjIndList.quant;

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
            quant: 1,
            item: this.schObj[index].item
          }
        )
      }


      let oindex = this.schDelObjList.findIndex(function (obj) {
        return (obj.sq_id === seq);
      });

      if (oindex >= 0) {
        this.schDelObjList[oindex].quant++;
      }
      else {
        this.schDelObjList.push(
          {
            date: this.for_date,
            sq_id: seq,
            quant: 1,
            item: schObjIndList.item,
            item_name: schObjIndList.item_name,
            price: schObjIndList.price,
            discount: schObjIndList.discount,
            discount_per: schObjIndList.discount_per,
            size: schObjIndList.size,
            type: schObjIndList.type,
            p_veg: schObjIndList.p_veg,
            ps_type: schObjIndList.ps_type,
            ps_size_id: schObjIndList.ps_size_id,
            ps_quant: schObjIndList.ps_quant,
            ps_unit: schObjIndList.ps_unit,
            sub_item: JSON.parse(JSON.stringify(schObjIndList.sub_item))
          }
        )
      }
      if (qt > 1) {
        this.schObj[index].quant--;
      }
      else {
        this.schObj.splice(index, 1);
      }
      console.log("obj for del " + JSON.stringify(this.schDelObj))
    }
  }

  addBackSchedule(seq) {

    let index = this.schDelObjList.findIndex(function (obj) {
      return (obj.sq_id === seq);
    });

    if (index >= 0) {
      let schObjIndList = this.schDelObjList[index];
      let qt = schObjIndList.quant;
      let myIndex =  this.schObj.findIndex(function (obj) {
        return (obj.sq_id === seq);
      });
      if (myIndex >= 0) {
        this.schObj[myIndex].quant++;
      }
      else {
        this.schObj.push({
          date: this.for_date,
          sq_id: seq,
          quant: 1,
          item: schObjIndList.item,
          item_name: schObjIndList.item_name,
          price: schObjIndList.price,
          discount: schObjIndList.discount,
          discount_per: schObjIndList.discount_per,
          size: schObjIndList.size,
          type: schObjIndList.type,
          p_veg: schObjIndList.p_veg,
          ps_type: schObjIndList.ps_type,
          ps_size_id: schObjIndList.ps_size_id,
          ps_quant: schObjIndList.ps_quant,
          ps_unit: schObjIndList.ps_unit,
          sub_item: JSON.parse(JSON.stringify(schObjIndList.sub_item))
        });

      }

      if (qt > 1) {
        this.schDelObjList[index].quant--;
      }
      else {
        this.schDelObjList.splice(index, 1);
      }

     let oindex = this.schDelObj.findIndex(function (obj) {
        return (obj.sq_id === seq);
     });
      if (oindex >= 0) {
        let oqt = this.schDelObj[oindex].quant;
        if (oqt > 1) {
          this.schDelObj[oindex].quant--;
        }
        else {
          this.schDelObj.splice(oindex, 1);
        }
      }
       
      
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
