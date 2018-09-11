import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { Services } from '@angular/core/src/view';
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage{
  showDate: Array<number>;
  showAll: number;
  constructor(public navCtrl: NavController, public appService: AppProvider) {
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

  cartQuantity(date?) {
    return this.appService.cartQuantity(date)
  }

  compareObj(a, b) {
    if (a.date < b.date)
      return -1;
    if (a.date > b.date)
      return 1;
    return 0;
  }

  getCart() {
    let cartObj = this.appService.getCart();
    if (Array.isArray(cartObj)) {
      return cartObj.sort(this.compareObj);     
    }
    else {
      return cartObj;
    }
   
  }

  addToCart(itemObj, date?) {
    let item = itemObj.item,
      item_name = itemObj.item_name,
      price = itemObj.price,
      discount = itemObj.discount,
      discount_per = itemObj.discount_per,
      quant = 1,
      size = itemObj.size,
      type = itemObj.type,
      p_veg = itemObj.p_veg,
      ps_type= itemObj.ps_type,
      ps_size_id = itemObj.ps_size_id,
      ps_quant = itemObj.ps_quant,
      ps_unit = itemObj.ps_unit,
      sub_item = itemObj.sub_item;

    this.appService.addToCart(item, item_name, price, discount, discount_per, quant, size, type, p_veg, ps_type, ps_size_id, ps_quant, ps_unit, sub_item, date);
  }

  removeFromCart(item, size, date?) {
    return this.appService.removeFromCart(item, size, date)
  }

  cartLength() {
    return this.appService.CartLength();
  }
  getCartWithDate(date) {
    return this.appService.getCartWithDate(date);
  }
  CartLengthForDate(date) {
   return this.appService.CartLengthForDate(date);
  }
  cartPrice(date) {
    return this.appService.cartPrice(date);
  }
  taxOnCart(date) {
    return this.appService.taxOnCart(date);
  }
  discountOnCart(date) {
    return this.appService.discountOnCart(date);
  }
  delieveryChargeOnCart() {
    return this.appService.delieveryChargeOnCart();
  }

  cartPriceTotal(date) {
    return this.appService.cartPriceTotal(date);
  }

  createSchedule(date) {
    return this.appService.createSchedule(date);
  }
  showDateStr(date) {
    return this.appService.showDateStr(date);
  }

}
