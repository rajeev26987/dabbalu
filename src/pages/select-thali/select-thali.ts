import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { SelThaliMenuPage } from '../sel-thali-menu/sel-thali-menu';
import { ThaliProvider } from '../../providers/app/thali';
import { Platform  } from 'ionic-angular';

/**
 * Generated class for the SelectThaliPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-select-thali',
  templateUrl: 'select-thali.html',
})
export class SelectThaliPage {

  size: string;
  curry_no: number;
  roti_no: number;
 

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController, public appService: AppProvider, public thaliProvider: ThaliProvider) {
   // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'thali-custom-popup', true);
    this.size = navParams.get('size');
    this.curry_no = 1;
    this.roti_no = 2;
 
    if (this.size == 'medium') {
      this.curry_no = 2;
    }
    else if (this.size == 'large') {
      this.curry_no = 3;
      this.roti_no = 3;
    }
    thaliProvider.clearThaliItem();


  }
  

  dismiss() {
    this.viewCtrl.dismiss();
  }
  vegInd() {
   return  this.thaliProvider.vegInd();
  }

  confirmThali() {
    let obj = this.getThali();
    this.appService.confirmThali(100, "Thali", this.thaliPriceTotal(), this.discountOnThali(), this.discountPercent(), 1, this.size, "t", this.vegInd(),"d0",0,0,"", obj);
    this.dismiss();

  }

  openSelThaliMenuModal(size, menu_type) {
    console.log("opening thali menu model");
    let modal = this.modalCtrl.create(SelThaliMenuPage, { size: size, menu_type: menu_type }, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

  get_curr_sel_day() {
   return this.appService.get_curr_sel_day();
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

  getMenuWithType(day) {
    return this.appService.getMenuWithType(day, 'a');
  }



  thaliLength() {
    return this.thaliProvider.thaliLength();
  }
  thaliPrice() {
    return this.thaliProvider.thaliPrice();
  }

  discountOnThali() {
    return this.thaliProvider.discountOnThali();
  }
  discountPercent() {
    return this.thaliProvider.discountPercent();
  }

  thaliPriceTotal() {
    return this.thaliProvider.thaliPriceTotal();
  }

  cartQuantityForThaliItem(item) {
    return this.thaliProvider.cartQuantityForThaliItem(item);
  }

  cartQuantityForThaliItemType(item) {
    if (item == 'r' || item == 'b') {
      return this.thaliProvider.cartQuantityForThaliItemType('r') +  this.thaliProvider.cartQuantityForThaliItemType('b');
    }
    else {
      return this.thaliProvider.cartQuantityForThaliItemType(item);
    }
   
  }
  getThali() {
   return this.thaliProvider.getThali();
  }
  getThaliListForItemType(type) {
   return this.thaliProvider.getThaliListForItemType(type);
  }

  addToThali(itemObj) {
    let item = itemObj.item,
      item_name = itemObj.item_name,
      price = itemObj.price,
      discount = itemObj.discount,
      discount_per = itemObj.discount_per,
      quant = 1,
      size = itemObj.size,
      type = itemObj.type,
      p_veg = itemObj.p_veg,
      ps_type = itemObj.ps_type,
      ps_size_id = itemObj.ps_size_id,
      ps_quant = itemObj.ps_quant,
      ps_unit = itemObj.ps_unit;
    if (!this.maxItemReached(itemObj.type)) {
      this.thaliProvider.addToThali(item, item_name, price, discount, discount_per, quant, size, type, p_veg, ps_type, ps_size_id, ps_quant, ps_unit);
    }

  }
  menuInitialized() {
    return this.appService.menuInitialized();
  }

  removeFromThali(item, size) {
    this.thaliProvider.removeFromThali(item, size);
  }

  thaliCondition() {
    
    let condition = this.cartQuantityForThaliItemType('c') == this.curry_no && this.cartQuantityForThaliItemType('r') > 0 && this.cartQuantityForThaliItemType('r') <= this.roti_no && this.cartQuantityForThaliItemType('a') < 3

    console.log("condition " + condition);
    return condition;
  }

  maxItemReached(menu_type) {
    let item_no = 0;
    if (menu_type == 'r' || menu_type == 'b') {
      item_no = this.roti_no;
    }
    else if (menu_type == 'c') {
      item_no = this.curry_no;
    }
    else if (menu_type == 'a') {
      item_no = 2;
    }
    let condition = this.cartQuantityForThaliItemType(menu_type) >= item_no;
    return (condition);

  }

  thaliItemCondition(menu_type) {
    let condition = false;
   
    if (menu_type == 'r' || menu_type == 'b') {
      condition = this.cartQuantityForThaliItemType('r') > 0 && this.cartQuantityForThaliItemType('r') <= this.roti_no;
    }
    else if (menu_type == 'c') {
      condition = this.cartQuantityForThaliItemType('c') == this.curry_no;
    }
    else if (menu_type == 'a') {
      condition = this.cartQuantityForThaliItemType('a') <= 2;
    }
    return (condition);

  }

}
