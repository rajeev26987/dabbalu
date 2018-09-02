import { Component, OnInit } from '@angular/core';
import { NavController,Platform, ActionSheetController,AlertController, ModalController   } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { Services } from '@angular/core/src/view';
import { SetQuantPage } from '../set-quant/set-quant';
import { SelectThaliPage } from '../select-thali/select-thali';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  
  items: Array<{ title: string, price: number, type: string, note: string, quant: number, size: string, icon: string, title2: string, price2: number, type2: string, note2: string, quant2: number, size2: string, icon2: string, }>;

  constructor(public navCtrl: NavController,        public platform: Platform,
    public actionsheetCtrl: ActionSheetController, public alertCtrl: AlertController, public modalCtrl: ModalController, public appService: AppProvider) {
    this.iniMenuItem();

  }

  iniMenuItem() {
    this.appService.iniMenuItem();
  }

  menuInitialized() {
    return this.appService.menuInitialized();
  }
  CartLengthForDate(date?) {
    return this.appService.CartLengthForDate(date);
  }

  getMenuItem(day) {
    return this.appService.getMenuItem(day);
  }

  get_curr_sel_date() {
    return this.appService.get_curr_sel_date();
  }

  get_curr_sel_day() {
    return this.appService.get_curr_sel_day();
  }

  getDates() {
    return this.appService.getDates();
  }
  showMenuForDate(cDate, cFlag) {
    this.appService.showMenuForDate(cDate, cFlag);
  }

  getCartWithDate() {
    return this.appService.getCartWithDate();
  }

  cartQuantity() {
    return this.appService.cartQuantity()
  }

  CartLength() {
      return this.appService.CartLength();
  }
  cartPrice() {
    return this.appService.cartPrice();
  }
  discountOnCart() {
    return this.appService.discountOnCart();
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

    console.log("yyyyy " + p_veg, ps_size_id, ps_quant, ps_unit);

    this.appService.addToCart(item, item_name, price, discount, discount_per, quant, size, type, p_veg, ps_type, ps_size_id, ps_quant, ps_unit, sub_item);
   }

   removeFromCart(item, size){
     this.appService.removeFromCart(item,size)
   }

  cartQuantityForItem(item) {
    return this.appService.cartQuantityForItem(item);
  }

  showDateStr() {
    return this.appService.showDateStr();
  }

  openSetQuantModal(itemAll) {
    let item = itemAll.item,
      item_name = itemAll.item_name,
      price = itemAll.price,
      type = itemAll.type,
      ps_type = itemAll.ps_type,
      ps_type_val = itemAll.ps_type_val,
      p_veg = itemAll.p_veg;
    let modal = this.modalCtrl.create(SetQuantPage, {itemAll:itemAll, item: item, item_name: item_name, price: price, p_veg: p_veg, thali: false, type:type, ps_type: ps_type, ps_type_val: ps_type_val, itemObj:""}, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

  openSetThaliModal(size, for_date) {
    console.log("opening thali model");
    let modal = this.modalCtrl.create(SelectThaliPage, { size: size, for_date: for_date }, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }



}
