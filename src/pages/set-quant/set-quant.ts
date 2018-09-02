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
  selector: 'page-set-quant',
  templateUrl: 'set-quant.html',
})
export class SetQuantPage {
  myItem: number;
  myItemName: string;
  myPrice: number;
  myThali: boolean;
  myType: string;
  ps_type: string;
  ps_type_val: any;
  p_veg: boolean;
  itemObj: any;
 // itemSize: string[];
  //itemPrice: number[];
  itemList: Array<{ item: number, item_name: string, size: string, price: number, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }>;
  curr_sel_date: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController, public appService: AppProvider) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
    this.myItem = navParams.get('item');
    this.myItemName = navParams.get('item_name');
    this.myPrice = navParams.get('price');
    this.myThali = navParams.get('thali');
    this.myType = navParams.get('type');
    this.itemObj = navParams.get('itemObj');
    this.ps_type = navParams.get('ps_type');
    this.ps_type_val = navParams.get('ps_type_val');
    this.p_veg = navParams.get('p_veg');


    /*if (this.myType == "r") {
      this.itemSize = ['half', 'full'];
      this.itemPrice = [this.myPrice, Math.round(this.myPrice * 1.5)];
    }
    else if (this.myType == 'b') {
      this.itemSize = ['Pack of 3', 'Pack of 5'];
      this.itemPrice = [this.myPrice, Math.round(this.myPrice * 1.5)];
    }
    else {
      this.itemSize = ['small', 'medium', 'large'];
      this.itemPrice = [this.myPrice, Math.round(this.myPrice * 1.2), Math.round(this.myPrice * 1.4)];
    }*/


    this.itemList = [];
    this.curr_sel_date = this.get_curr_sel_date();
    for (let i = 0; i < this.ps_type_val.length; i++) {
      this.itemList.push({
        item: this.myItem,
        item_name: this.myItemName,
        size: this.ps_type_val[i].sc_size,
        price: this.ps_type_val[i].ps_price,
        quant: this.getItemQuantInCart(this.myItem, this.ps_type_val[i].sc_size),
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

  addToCart(itemObj) {
    let item = itemObj.item,
      item_name = itemObj.item_name,
      price = itemObj.price,
      discount = 0,
      discount_per = 0,
      quant = 1,
      size = itemObj.size,
      type = itemObj.type,
      p_veg = itemObj.p_veg,
      ps_type = itemObj.ps_type,
      ps_size_id = itemObj.ps_size_id,
      ps_quant = itemObj.ps_quant,
      ps_unit = itemObj.ps_unit,
      sub_item = itemObj.sub_item;
    

    this.appService.addToCart(item, item_name, price, discount, discount_per, quant, size, type, p_veg, ps_type, ps_size_id, ps_quant, ps_unit, sub_item);
    let index = this.checkItemInItemList(item, size);
    if (index >= 0) {
      this.itemList[index].quant = this.getItemQuantInCart(item, size);
    }
  }

  removeFromCart(item, size) {
    this.appService.removeFromCart(item, size);
    let index = this.checkItemInItemList(item, size);
    if (index >= 0) {
      this.itemList[index].quant = this.getItemQuantInCart(item, size);
    }
  }

  }







