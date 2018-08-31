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
  CartLengthForDate() {
    return this.appService.CartLengthForDate();
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

  taxOnCart() {
    return this.appService.taxOnCart();
  }
  delieveryChargeOnCart() {
    return this.appService.delieveryChargeOnCart();
  }

  cartPriceTotal() {
    return this.appService.cartPriceTotal();
  }

   addToCart(item,item_name,price,quant,size, type, sub_item){

     this.appService.addToCart(item, item_name, price, quant, size, type, sub_item);
   }

   removeFromCart(item, size){
     this.appService.removeFromCart(item,size)
   }

  cartQuantityForItem(item) {
    return this.appService.cartQuantityForItem(item);
  }

  openSetQuantModal(item, item_name, price, type) {
    let modal = this.modalCtrl.create(SetQuantPage, { item: item, item_name: item_name, price: price, thali: false, type:type, itemObj:""}, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

  openSetThaliModal(size, for_date) {
    console.log("opening thali model");
    let modal = this.modalCtrl.create(SelectThaliPage, { size: size, for_date: for_date }, { showBackdrop: true, enableBackdropDismiss: true });
    modal.present();
  }

 
    selectQuantity(item,item_name,price,quant,size, type, sub_item) {
        let alert = this.alertCtrl.create({
            title: 'Quantity',
            inputs : [
                {
                    type:'radio',
                    label:'Small '+ "₹" +price,
                    value: "small",
                    checked: size == "small"
                },
                {
                    type:'radio',
                    label:'Medium '+ "₹" +Math.round(price * 1.2 ),
                    value:'medium',
                    checked: size == "medium"
                },
                {
                    type:'radio',
                    label:'Large '+ "₹" +Math.round(price * 1.4),
                    value:'large',
                    checked: size == "large"
                }
            ],
            buttons: [
                {
                text: 'Add',

                    handler: data => {
                        this.addToCart(item,item_name,price,quant,data, type, sub_item);
                        console.log('Cancel clicked '+data + " "+item + " "+price + " "+quant);
                    }

                }]
        });
        alert.present();
    }

}
