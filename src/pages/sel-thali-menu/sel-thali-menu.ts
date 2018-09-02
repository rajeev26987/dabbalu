import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { SetQuantPage } from '../set-quant/set-quant';
import { ThaliProvider } from '../../providers/app/thali';
import { SetThaliQuantPage } from '../set-thali-quant/set-thali-quant';

/**
 * Generated class for the SelThaliMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sel-thali-menu',
  templateUrl: 'sel-thali-menu.html',
})
export class SelThaliMenuPage {

  size: string;
  menu_type: string;
  menu_type_str: string;
  item_no: number;
 


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public renderer: Renderer, public viewCtrl: ViewController, public appService: AppProvider, public thaliProvider: ThaliProvider) {
    // this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'thali-custom-popup', true);
    this.size = navParams.get('size');
    this.item_no = 1;

    this.menu_type = navParams.get('menu_type');
    if (this.menu_type == 'r') {
      this.menu_type_str = "Roti/Rice";
      this.item_no = 2;
      if (this.size == 'large') {
        this.item_no = 3;
      }
    }
    else if (this.menu_type == 'c') {
      this.menu_type_str = "Curry";
      this.item_no = 1;
      if (this.size == 'medium') {
        this.item_no = 2;
      }
      else if (this.size == 'large') {
        this.item_no = 3;
      }
    }
    else if (this.menu_type == 'a') {
      this.menu_type_str = "Addon";
      this.item_no = 2;
    }
    else {
      this.menu_type_str = "Menu";
    }
    if (this.menuInitialized() == 2 || this.menuInitialized() == 0) {
      console.log("menu not initialized " + this.menuInitialized());
      this.iniMenuItem();
    }
  }

  iniMenuItem() {
    this.appService.iniMenuItem();
  }

  menuInitialized() {
    return this.appService.menuInitialized();
  }

  getMenuItem(day) {
    return this.appService.getMenuItem(day);
  }
  get_curr_sel_day() {
    return this.appService.get_curr_sel_day();
  }

  openSetQuantModal(itemAll) {
    let item = itemAll.item,
      item_name = itemAll.item_name,
      price = itemAll.price,
      type = itemAll.type,
      ps_type = itemAll.ps_type,
      ps_type_val = itemAll.ps_type_val,
      p_veg = itemAll.p_veg;
    let modal = this.modalCtrl.create(SetThaliQuantPage, {itemAll:itemAll, item: item, item_name: item_name, price: price, p_veg:p_veg, ps_type:ps_type, ps_type_val: ps_type_val, menu_type: this.menu_type, item_no: this.item_no, thali: true, type: type, itemObj: this.getThali() }, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  getMenuWithType(day) {
    return this.appService.getMenuWithType(day,this.menu_type) 
  }


  get_curr_sel_date() {
    return this.appService.get_curr_sel_date();
  }

  getDates() {
    return this.appService.getDates();
  }
  showMenuForDate(cDate, cFlag) {
    this.appService.showMenuForDate(cDate, cFlag);
  }


  addToThali(itemObj) {
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
    if (!this.maxItemReached()) {
      this.thaliProvider.addToThali(item, item_name, price, quant, size, type, p_veg, ps_type, ps_size_id, ps_quant, ps_unit);
    }
 
  }

  removeFromThali(item, size) {
    this.thaliProvider.removeFromThali(item, size);
  }

  cartQuantityForThaliItem(item) {
    return this.thaliProvider.cartQuantityForThaliItem(item);
  }
  cartQuantityForThaliItemType(item) {
    if (item == 'r') {
      return this.thaliProvider.cartQuantityForThaliItemType('r') + this.thaliProvider.cartQuantityForThaliItemType('b');
    }
    else {
      return this.thaliProvider.cartQuantityForThaliItemType(item);
    }

  }

  getThali() {
    this.thaliProvider.getThali();
  }

  maxItemReached() {
    let condition = this.cartQuantityForThaliItemType(this.menu_type) >= this.item_no;
    console.log("max item " + this.cartQuantityForThaliItemType(this.menu_type) + " - " + this.item_no + " condition " + condition);
    return (condition);

  }


}
