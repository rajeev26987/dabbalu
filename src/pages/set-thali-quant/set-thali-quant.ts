import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { ThaliProvider } from '../../providers/app/thali';

/**
 * Generated class for the SetQuantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-set-thali-quant',
  templateUrl: 'set-thali-quant.html',
})
export class SetThaliQuantPage {
  myItem: number;
  myItemName: string;
  myPrice: number;
  myType: string;
  myThali: boolean;
  itemObj: any;
  itemSize: string[];
  itemPrice: number[];
  itemList: Array<{ item: number, item_name: string, size: string, price: number, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }>;
  curr_sel_date: number;
  menu_type: string;
  item_no: number;
  ps_type: string;
  ps_type_val: any;
  p_veg: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController, public appService: AppProvider, public thaliProvider: ThaliProvider) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
    this.myItem = navParams.get('item');
    this.myItemName = navParams.get('item_name');
    this.myPrice = navParams.get('price');
    this.myType = navParams.get('type');
    this.myThali = navParams.get('thali');
    this.itemObj = navParams.get('itemObj');
    this.menu_type = navParams.get('menu_type');
    this.item_no = navParams.get('item_no');
    this.ps_type_val = navParams.get('ps_type_val');
    this.p_veg = navParams.get('p_veg');
    this.ps_type = navParams.get('ps_type');


  /*  if (this.myType == "r") {
      this.itemSize = ['half', 'full'];
      this.itemPrice = [this.myPrice, Math.round(this.myPrice * 1.5)]
    }
    else if (this.myType == 'b') {
      this.itemSize = ['Pack of 3', 'Pack of 5'];
      this.itemPrice = [this.myPrice, Math.round(this.myPrice * 1.5)]
    }
    else {
      this.itemSize = ['small', 'medium', 'large'];
      this.itemPrice = [this.myPrice, Math.round(this.myPrice * 1.2), Math.round(this.myPrice * 1.4)]
    }*/


    this.itemList = [];
    this.curr_sel_date = this.get_curr_sel_date();
    for (let i = 0; i < this.ps_type_val.length; i++) {
      this.itemList.push({
        item: this.myItem,
        item_name: this.myItemName,
        size: this.ps_type_val[i].sc_size,
        price: this.ps_type_val[i].ps_price,
        quant: this.getItemQuantInThali(this.myItem, this.ps_type_val[i].sc_size),
        date: this.curr_sel_date,
        type: this.myType,
        p_veg: this.p_veg,
        ps_type: this.ps_type,
        ps_size_id: this.ps_type_val[i].ps_size_id,
        ps_quant: this.ps_type_val[i].ps_quant,
        ps_unit: this.ps_type_val[i].ps_unit
      });
    }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  get_curr_sel_date() {
    return this.appService.get_curr_sel_date();
  }

  checkItemInItemList(item, size) {
    let pThis = this;
    let myIndex = this.itemList.findIndex(function (obj) {
      return (obj.item === item && obj.size === size && obj.date == pThis.curr_sel_date);
    });
    return myIndex;
  }

  getItemQuantInItemList(item, size) {
    let pThis = this;
    let myIndex = this.itemList.findIndex(function (obj) {
      return (obj.item === item && obj.size === size && obj.date == pThis.curr_sel_date);
    });
    if (myIndex >= 0) {
      return this.itemList[myIndex].quant;
    }
    else {
      return 0;
    }

  }

  getItemQuantInCart(item, size) {
    return this.appService.getItemQuantInCart(item, size);
  }

 
  getItemQuantInThali(item, size) {
    return this.thaliProvider.getItemQuantInThali(item, size);
  }

  addToThali(itemObj) {
 
    if (!this.maxItemReached()) {
      let item = itemObj.item,
        item_name = itemObj.item_name,
        price = itemObj.price,
        quant = 1,
        size = itemObj.size,
        type = itemObj.type,
        p_veg = itemObj.p_veg,
        ps_type = itemObj.ps_type,
        ps_size_id = itemObj.ps_size_id,
        ps_quant = itemObj.ps_quant,
        ps_unit = itemObj.ps_unit;


      this.thaliProvider.addToThali(item, item_name, price, quant, size, type, p_veg, ps_type, ps_size_id, ps_quant, ps_unit);

      let index = this.checkItemInItemList(item, size);
      if (index >= 0) {
        this.itemList[index].quant = this.getItemQuantInThali(item, size);
      }
    }

  }

  removeFromThali(item, size) {
    this.thaliProvider.removeFromThali(item, size);
    let index = this.checkItemInItemList(item, size);
    if (index >= 0) {
      this.itemList[index].quant = this.getItemQuantInThali(item, size);
    }
  }

  cartQuantityForThaliItem(item) {
    return this.thaliProvider.cartQuantityForThaliItem(item);
  }

  getThali() {
    this.thaliProvider.getThali();
  }

  cartQuantityForThaliItemType(item) {
    if (item == 'r') {
      return this.thaliProvider.cartQuantityForThaliItemType('r') + this.thaliProvider.cartQuantityForThaliItemType('b');
    }
    else {
      return this.thaliProvider.cartQuantityForThaliItemType(item);
    }

  }

  maxItemReached() {
    let condition = this.cartQuantityForThaliItemType(this.menu_type) >= this.item_no;
    console.log("max item " + this.cartQuantityForThaliItemType(this.menu_type) + " - " + this.item_no + " condition " + condition);
    return (condition);

  }



}
