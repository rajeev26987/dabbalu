import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { Services } from '@angular/core/src/view';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage{

  constructor(public navCtrl: NavController, public appService: AppProvider) {

  }

  cartQuantity() {
    return this.appService.cartQuantity()
  }

  getCart() {
    return this.appService.getCart();
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
      sub_item = itemObj.sub_item;

    this.appService.addToCart(item, item_name, price, discount,discount_per, quant, size, type, sub_item);
  }

  removeFromCart(item, size) {
    return this.appService.removeFromCart(item, size)
  }

  CartLength() {
    return this.appService.CartLength();
  }
  cartPrice() {
    return this.appService.cartPrice();
  }
  taxOnCart() {
    return this.appService.taxOnCart();
  }
  delieveryChargeOnCart() {
    return this.appService.delieveryChargeOnCart();
  }

  cartPriceTotal() {
    return this.appService.cartPriceTotal();
  }

}
