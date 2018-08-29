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
  myItem: string;
  myPrice: number;
  myThali: boolean;
  myType: string;
  itemObj: any;
  itemSize: string[];
  itemPrice: number[];
  itemList: Array<{ item: string, size: string, price: number, quant: number, date: Date, type: string }>;
  curr_sel_date: Date;


  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController, public appService: AppProvider) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
    this.myItem = navParams.get('item');
    this.myPrice = navParams.get('price');
    this.myThali = navParams.get('thali');
    this.myType = navParams.get('type');
    this.itemObj = navParams.get('itemObj');
    if (this.myType == "r") {
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
    }


    this.itemList = [];
    this.curr_sel_date = this.get_curr_sel_date();
    for (let i = 0; i < this.itemSize.length; i++) {
      this.itemList.push({
        item: this.myItem,
        size: this.itemSize[i],
        price: this.itemPrice[i],
        quant: this.getItemQuantInCart(this.myItem, this.itemSize[i]),
        date: this.curr_sel_date,
        type: this.myType
      });
    }
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

  addToCart(item, price, quant, size, type) {
    this.appService.addToCart(item, price, quant, size, type);
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







