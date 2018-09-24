import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stagger } from '@angular/core/src/animation/dsl';
import { LoadingController, ToastController } from 'ionic-angular';



/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

  icons: string[];
  item: string[];
  price: number[];
  item_type: string[];
  all_item: string[];
  cart_items: Array<{date: number, data:Array<{ item: number, item_name: string, price: number, discount: number, discount_per: number, size: string, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string, sub_item: Array<{ item: number, item_name: string, price: number, discount: number, discount_per, number, size: string, quant: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }> }>}>;

  menu_items: any;
  menu_init: number;
  schedule_items: any;
  schedule_init: number;
  tax_per: number;
  deliver_ch: number;
  dates: Date[];
  myDates: Array<{ day: string, date: number, date_num: number, date_obj:number, flag: boolean, sel: boolean }>;
  weekDay: string[];
  cur_sel_date: number;
  monthNames: string[];
  loader: any;
  msg: any;
 // default_sub_item: { item: string, price: number, size: string, quant: number };


  constructor(private http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
   
    this.schedule_init = 0;
    this.getScheduledItems();
    this.menu_init = 0;
    let iniCart = localStorage.getItem("cart");
    if (iniCart) {
      this.cart_items = JSON.parse(iniCart);
    }
    else {
      this.cart_items = [];
    }
   
    this.tax_per = 0.12;
    this.deliver_ch = 0;
    this.weekDay = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];
    this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

  /*  let start = new Date();
    let start_num = this.formatDate(start);
    let end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    let end_num = this.formatDate(end);
    end = (start.getDate() > 24) ? new Date(start.getFullYear(), start.getMonth() + 2, 0) : end;
    this.myDates = [];
    this.weekDay = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];
    this.monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let flag = (start.getDay() == 0 || start.getDay() == 6) ? false : true;
    let sel = flag;
    let sel_flag = sel;
    let counter = 0;
    if (sel) { this.cur_sel_date = start_num };

    this.myDates.push({
      day: "TODAY",
      date: start.getDate(),
      date_num: start_num,
      date_obj: start_num,
      flag: flag,
      sel: sel
    })
    let next_date = new Date();
    next_date.setDate(start.getDate() + ++counter);
    flag = (next_date.getDay() == 0 || next_date.getDay() == 6) ? false : true;
    sel = sel_flag ? false : flag;
    if (sel) { this.cur_sel_date = this.formatDate(next_date) };
    sel_flag = sel_flag ? true : sel;
    this.myDates.push({
      day: "TOMORROW",
      date: next_date.getDate(),
      date_num: this.formatDate(next_date),
      date_obj: this.formatDate(next_date),
      flag: flag,
      sel: sel
    })

    while (this.myDates[this.myDates.length - 1].date_obj < end_num) {
      let my_next_date = new Date();
      my_next_date.setDate(start.getDate() + ++counter);      
      flag = (my_next_date.getDay() == 0 || my_next_date.getDay() == 6) ? false : true;
      sel = sel_flag ? false : flag;
      if (sel) { this.cur_sel_date = this.formatDate(my_next_date) };
      sel_flag = sel_flag ? true : sel;
      

      this.myDates.push({
        day: this.weekDay[my_next_date.getDay()],
        date: my_next_date.getDate(),
        date_num: this.formatDate(my_next_date),
        date_obj: this.formatDate(my_next_date),
        flag: flag,
        sel: sel
      })

    }*/
  
  }



  menuInitialized() {
    return this.menu_init;
  }

  iniMenuItem() {
    if (this.menu_init != 1) {
      this.loader = this.loadingCtrl.create({
        content: "Please wait...",

      });
      this.loader.present();
      this.menu_init = 3;
      this.http.get("http://dabbalu.com/ini_menu.php").subscribe(r => {
        this.loader.dismiss();
         this.cur_sel_date = r['cur_sel_date'];
        this.menu_items = r['menu_data'];
        this.myDates = r['menu_dates'];
       
        this.menu_init = 1;

      },
        error => {
          this.loader.dismiss();
          this.menu_init = 2;
           this.msg = this.toastCtrl.create({
            message: 'Menu not loaded',
            duration: 3000
           });
          this.msg.present();

        }
      );
    }
  }

  getScheduledItems(date?) {
    if (this.schedule_init != 1 && this.schedule_init != 3) {
      this.schedule_init = 3;
      this.http.get("http://dabbalu.com/get_schedule_new.php").subscribe(r => {     
        this.schedule_items = r;
        this.schedule_init = 1;

      },
        error => {
          this.schedule_init = 2;
        }
      );
    }
  }


  createSchedule(date?) {
    this.loader = this.loadingCtrl.create({
      content: "Scheduling...",

    });
    this.loader.present();
    let cart = JSON.stringify(this.getCartWithDate(date));
   

    this.http.post("http://dabbalu.com/schedule_item_new.php", cart).subscribe(r => {
      
      this.schedule_items = r;
      this.schedule_init = 1;
      this.removeFromCartForDate(date);
      this.loader.dismiss();
    },
      error => {
        this.loader.dismiss();
        this.msg = this.toastCtrl.create({
          message: "Couldn't create schedule",
          duration: 3000
        });
        this.msg.present();
      }
    );
  }

  updateSchedule(schDel) {
    this.loader = this.loadingCtrl.create({
      content: "Updating schedule...",

    });
    this.loader.present();
    let data = JSON.stringify(schDel);
   
    this.http.post("http://dabbalu.com/sechedule_delete_new.php", data).subscribe(r => {
      this.schedule_items = r;
      this.schedule_init = 1;
      this.loader.dismiss();
    },
      error => {
        this.loader.dismiss();
        this.msg = this.toastCtrl.create({
          message: "Couldn't update schedule",
          duration: 3000
        });
        this.msg.present();
      }
    );

  }

  deleteAllFromSchedule() {
    this.loader = this.loadingCtrl.create({
      content: "Deleting schedule...",

    });
    this.loader.present();
    let data = JSON.stringify({user_id: 100});

    this.http.post("http://dabbalu.com/sechedule_delete_all.php", data).subscribe(r => {
      this.schedule_items = r;
      this.schedule_init = 1;
      this.loader.dismiss();
    },
      error => {
        this.loader.dismiss();
        this.msg = this.toastCtrl.create({
          message: "Couldn't delete schedule",
          duration: 3000
        });
        this.msg.present();
      }
    );
  }

  groupScheduledItemsLength() {
    let itemObj = this.groupScheduledItems();
    if (Array.isArray(itemObj)) {
      return itemObj.length;
    }
    else {
      return 0;
    }
  }

  groupScheduledItems() {
    let oitemObj = this.getAllScheduleItems();
    let pThis = this;
    if (oitemObj != 0) {
 
      let olen = oitemObj.length;
      let oschItem: Array<{ date: number, data: Array<{ item: number, item_name: string, price: number, discount: number, discount_per: number, size: string, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string, sub_item: Array<{ item: number, item_name: string, price: number, discount: number, discount_per, number, size: string, quant: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }> }> }>;
      oschItem = [];
      for (let x = 0; x < olen; x++) {
        
        let itemObj = oitemObj[x].data
        let len = itemObj.length;
        let schItem: Array<{ item: number, item_name: string, price: number, discount: number, discount_per: number, size: string, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string, sub_item: Array<{ item: number, item_name: string, price: number, discount: number, discount_per, number, size: string, quant: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }> }>;
        schItem = [];
      for (let i = 0; i < len; i++) {
        let subO = [];
        let myIndex;
        if (itemObj[i].item == 100) {
          subO = itemObj[i].sub_item;
          myIndex = schItem.findIndex(function (obj) {
            return (obj.item === itemObj[i].item && obj.size === itemObj[i].size && obj.date == itemObj[i].date && pThis.sameObj(obj.sub_item, subO));
          });
        }
        else {
          subO = [];
          myIndex = schItem.findIndex(function (obj) {
            return (obj.item === itemObj[i].item && obj.size === itemObj[i].size && obj.date == itemObj[i].date);
          });
        }

        if (myIndex >= 0) {
        
          schItem[myIndex].quant += Number(itemObj[i].quant);
          schItem[myIndex].price += Number(itemObj[i].price) * Number(itemObj[i].quant);
          schItem[myIndex].discount += Number(itemObj[i].discount) * Number(itemObj[i].quant);
        }
        else {

          schItem.push({
            item: itemObj[i].item,
            item_name: itemObj[i].item_name,
            price: Number(itemObj[i].price) * Number(itemObj[i].quant),
            discount: Number(itemObj[i].discount) * Number(itemObj[i].quant),
            discount_per: Number(itemObj[i].discount_per),
            size: itemObj[i].size,
            quant: Number(itemObj[i].quant),
            date: itemObj[i].date,
            type: itemObj[i].type,
            p_veg: itemObj[i].p_veg,
            ps_type: itemObj[i].ps_type,
            ps_size_id: itemObj[i].ps_size_id,
            ps_quant: itemObj[i].ps_quant,
            ps_unit: itemObj[i].ps_unit,
            sub_item: subO
          });
        }
      }

        oschItem.push({
          date: oitemObj[x].date,
          data: schItem
        });
    }
      return oschItem;
    }
    else {
      return 0;
    }

  }

  groupScheduledItemsForDate(date?) {

    let itemObj = this.getScheduleItemsForDate(date);
    let pThis = this;
    if (itemObj != 0) {

      let len = itemObj.length;
      let schItem: Array<{ item: number, item_name: string, price: number, discount: number, discount_per: number, size: string, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string, sub_item: Array<{ item: number, item_name: string, price: number, discount: number, discount_per, number, size: string, quant: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }> }>;
      schItem = [];
      for (let i = 0; i < len; i++) {
        let subO = [];
        let myIndex;
        if (itemObj[i].item == 100) {
          subO = itemObj[i].sub_item;
          myIndex = schItem.findIndex(function (obj) {
            return (obj.item === itemObj[i].item && obj.size === itemObj[i].size && obj.date == itemObj[i].date && pThis.sameObj(obj.sub_item, subO));
          });
        }
        else {
          subO = [];
          myIndex = schItem.findIndex(function (obj) {
            return (obj.item === itemObj[i].item && obj.size === itemObj[i].size && obj.date == itemObj[i].date );
          });
        }
        
        if (myIndex >= 0) {
 
          schItem[myIndex].quant += Number(itemObj[i].quant);
          schItem[myIndex].price += Number(itemObj[i].price) * Number(itemObj[i].quant);
          schItem[myIndex].discount += Number(itemObj[i].discount)  * Number(itemObj[i].quant);
        }
        else {

          schItem.push({
            item: itemObj[i].item,
            item_name: itemObj[i].item_name,
            price: Number(itemObj[i].price) * Number(itemObj[i].quant),
            discount: Number(itemObj[i].discount) * Number(itemObj[i].quant),
            discount_per: Number(itemObj[i].discount_per),
            size: itemObj[i].size,
            quant: Number(itemObj[i].quant),
            date: itemObj[i].date,
            type: itemObj[i].type,
            p_veg: itemObj[i].p_veg,
            ps_type: itemObj[i].ps_type,
            ps_size_id: itemObj[i].ps_size_id,
            ps_quant: itemObj[i].ps_quant,
            ps_unit: itemObj[i].ps_unit,
            sub_item: subO
          });
        }
      }
      return schItem;
    }
    else {
      return 0;
    }

  }


  getAllScheduleItems() {
    let dateObj = new Date();
    let date = this.formatDate(dateObj);
    if (this.schedule_init == 1) {
      let obj = this.schedule_items.filter(item => item.date >= date);
      if (obj) {
        return obj;
      }    
    }
    else {
      this.getScheduledItems();
    }
    return 0;
  }
  getAllScheduleItemsLength() {
    let obj = this.getAllScheduleItems();
    if (obj) {
      return this.getAllScheduleItems().length;
    }
    else {
      return 0;
    }
    
  }

  getAllScheduleItemPrice() {
    let obj = this.getAllScheduleItems();
    let p = 0;
    if (obj != 0) {
      
      for (let i of obj) {
        for (let x of i.data) {
          p += Number(x.price)  * Number(x.quant);
        }        
      }     
    }
    return Math.round(p * (1 + this.tax_per));
  }

  getNextScheduleItemDatePrice() {
    let obj = this.getAllScheduleItems();
    let p = 0;
    let d = 0;
    if (obj != 0) {
      let i = obj[0].data;
      d = obj[0].date;
      for (let x of i) {
        p += Number(x.price) * Number(x.quant);
      }
    }
    return [d, Math.round(p * (1 + this.tax_per))];
  }

  getScheduleItemsForDate(date?) {
    if (!date) {
      date = this.cur_sel_date;
    }
    if (this.schedule_init == 1) {
      let obj = this.schedule_items.filter(item => item.date == date);

      if (obj.length > 0) {
        return obj[0].data;
      }
    }
    else {
      this.getScheduledItems();
      
    }
    return 0;
  }

  getScheduleItemsLenForDate(date?) {
    return this.getScheduleItemsForDate(date).length;
  }

  scheduledItemPrice(date?) {
    let p: number;
    p = 0;
    for (let x of this.getScheduleItemsForDate(date)) {
      p += (Number(x.price) + Number(x.discount)) * x.quant;
    }
    return Math.round(p);
  }
  scheduledItemPriceAfterDiscount(date?) {
    let p: number;
    p = 0;
    for (let x of this.getScheduleItemsForDate(date)) {
      p += Number(x.price) * Number(x.quant);
    }
    return Math.round(p);
  }
  discountOnScheduledItem(date?) {
    let p: number;
    p = 0;
    for (let x of this.getScheduleItemsForDate(date)) {
      p += Number(x.discount) * Number(x.quant);
    }
    return Math.round(p);
  }

  taxOnScheduledItem(date?) {
    return Math.round(this.scheduledItemPriceAfterDiscount(date) * this.tax_per);
  }
  delieveryChargeOnScheduledItem() {
    return Math.round(this.deliver_ch);
  }

  scheduledItemPriceTotal(date?) {
    return (this.scheduledItemPriceAfterDiscount(date) + this.taxOnScheduledItem() + this.delieveryChargeOnScheduledItem());
  }



  getMenuItem(day) {
  
    if (this.menu_init == 1) {
      return this.menu_items[day];
    }
    else if (this.menu_init == 2 || this.menu_init == 0) {
      this.iniMenuItem();
      return 0;
    }
    else {
      return 0;
    }
  }

  getMenuWithType(day, type) {
   

    if (this.menu_init == 1) {
      if (type == 'r') {
        return this.menu_items[day].filter(item => item.type == type || item.type == 'b');
      }
      else if (type == 'c' || type == 'a') {
        return this.menu_items[day].filter(item => item.type == type);
      }
      else {
        return this.menu_items[day];
      }
    }
    else if (this.menu_init == 2 || this.menu_init == 0) {
      this.iniMenuItem();
      return 0;
    }
    else {
      return 0;
    }
   
  }

  getCart() {
    let dateObj = new Date();
    let date = this.formatDate(dateObj);
    return this.cart_items.filter(obj => obj.date >= date);
  }

  getCartWithDate(date?) {
    if (!date) {
      date = this.cur_sel_date;
    }
    let cartObj = this.cart_items.filter(item => item.date == date);
    if (cartObj && cartObj[0]) {
      return cartObj[0].data;
    }
    else {
    let obj:  Array<{ item: number, item_name: string, price: number, discount: number, discount_per: number, size: string, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string, sub_item: Array<{ item: number, item_name: string, price: number, discount: number, discount_per, number, size: string, quant: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }> }>;
      obj = [];
      return obj;
    }
  }

  deleteAllFromCart() {
    this.cart_items = [];
    localStorage.setItem("cart", JSON.stringify(this.cart_items));
  }


 /* getCartWithDate(date?) {
    if (date) {
      return this.cart_items.filter(item => item.date == date);
    }
    else {
      return this.cart_items.filter(item => item.date == this.cur_sel_date);
    }
    
  }*/
  
  CartLength() {
    let cartObj = this.getCart();
    if (cartObj) {
      return this.cart_items.length;
    }
    else {
      return 0;
    }
    
    }


  CartLengthForDate(date?) {
      return this.getCartWithDate(date).length;
  }

  checkItemInCart(item, size, date?) {
    let pThis = this;
    let myIndex = this.getCartWithDate(date).findIndex(function (obj) {
      return (obj.item === item && obj.size === size && obj.date == pThis.cur_sel_date);
    });
    return myIndex;
  }

  getItemQuantInCart(item, size,date?) {
    let pThis = this;
    let cartObj = this.getCartWithDate(date);
    let myIndex = cartObj.findIndex(function (obj) {
      return (obj.item === item &&  obj.size === size);     
    });
    if (myIndex >= 0) {
      return cartObj[myIndex].quant;
    }
    else {
      return 0;
    }    
  }


  cartQuantity(date?) {
    let q = 0;
    let cartObj = this.getCartWithDate(date);
    for (let x of cartObj) {
      q += x.quant
    }
    return Math.round(q);
  }

  cartQuantityForItem(item,date?) {
    let q: number;
    q = 0;
    let cartObj =  this.getCartWithDate(date);
    for (let x of cartObj) {
      if (item == x.item) {
        q += x.quant;
      }  
    }
    return Math.round(q);
  }

  cartQuantityForThali(itemObj, date?) {
    let pThis = this;
    let q = 0;
    let cartObj = this.getCartWithDate(date);
    let myIndex = cartObj.findIndex(function (obj) {
      return (obj.item === itemObj.item && obj.size === itemObj.size &&  obj.sub_item == itemObj.sub_item );
    });
    if (myIndex > -1) {
      q = cartObj[myIndex].quant;
    }
    return Math.round(q);
  }

  cartQuantityForItemSize(itemObj, date?) {
    let pThis = this;
    let q = 0;
    let cartObj = this.getCartWithDate(date);
    let myIndex = cartObj.findIndex(function (obj) {
      return (obj.item === itemObj.item && obj.size === itemObj.size);
    });
    if (myIndex > -1) {
      q = cartObj[myIndex].quant;
    }
    return Math.round(q);
  }


  compareObj(a, b) {
    if (a.item < b.item)
      return -1;
    if (a.item > b.item)
      return 1;
    return 0;
  }

  sameObj(arr1, arr2) {
    if (JSON.stringify(arr1.sort(this.compareObj)) === JSON.stringify(arr2.sort(this.compareObj))) {
      return true;
    }
    else {
      return false;
    }
  }

  confirmThali(item, item_name, price, discount, discount_per, quant, size, type, p_veg, ps_type, ps_size_id, ps_quant, ps_unit, subObj, date?) {
    let pThis = this;
    subObj.sort();
    if (!date) {
      date = this.cur_sel_date;
    }
    let cIndex = this.cart_items.findIndex(function (obj) {
      return (obj.date === date );
    });
    if (cIndex >= 0) {
      let myIndex = this.cart_items[cIndex].data.findIndex(function (obj) {
        return (obj.item === item && obj.size === size && pThis.sameObj(obj.sub_item, subObj));
      });

      if (myIndex >= 0) {
        this.cart_items[cIndex].data[myIndex].quant++;
      }
      else {
        this.cart_items[cIndex].data.push({

          item: item,
          item_name: item_name,
          price: price,
          discount: discount,
          discount_per: discount_per,
          size: size,
          quant: quant,
          date: date,
          type: type,
          p_veg: p_veg,
          ps_type: ps_type,
          ps_size_id: ps_size_id,
          ps_quant: ps_quant,
          ps_unit: ps_unit,
          sub_item: subObj
        });
      }
    }
    else {
      let cartData: Array<{ item: number, item_name: string, price: number, discount: number, discount_per: number, size: string, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string, sub_item: Array<{ item: number, item_name: string, price: number, discount: number, discount_per, number, size: string, quant: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }> }>;
      cartData = [];
      cartData.push({
        item: item,
        item_name: item_name,
        price: price,
        discount: discount,
        discount_per: discount_per,
        size: size,
        quant: quant,
        date: date,
        type: type,
        p_veg: p_veg,
        ps_type: ps_type,
        ps_size_id: ps_size_id,
        ps_quant: ps_quant,
        ps_unit: ps_unit,
        sub_item: subObj});
      this.cart_items.push({
        date: date,
        data: cartData
      });

    }
    
 
    localStorage.setItem("cart", JSON.stringify(this.cart_items));

  }

  cartPrice(date?) {
    let p: number;
    p = 0;
    for (let x of this.getCartWithDate(date)) {
      p += (x.price + x.discount) * x.quant;
    }
    return Math.round(p);
  }
  cartPriceAfterDiscount(date?) {
    let p: number;
    p = 0;
    for (let x of this.getCartWithDate(date)) {
      p += x.price  * x.quant;
    }
    return Math.round(p);
  }
  discountOnCart(date?) {
    let p: number;
    p = 0;
    for (let x of this.getCartWithDate(date)) {
      p += x.discount * x.quant;
    }
    return Math.round(p);
  }

  taxOnCart(date?) {
    return Math.round(this.cartPriceAfterDiscount(date) * this.tax_per);
  }
  delieveryChargeOnCart() {
    return Math.round(this.deliver_ch);
  }

  cartPriceTotal(date?) {
    return (this.cartPriceAfterDiscount(date) + this.taxOnCart(date) + this.delieveryChargeOnCart()) ;
  }
   
   
  addToCart(item, item_name, price, discount, discount_per, quant, size, type, p_veg, ps_type, ps_size_id, ps_quant, ps_unit, sub_item, date?) {
    if (!Array.isArray(sub_item)) {
      sub_item = [];
    }

    let pThis = this;
    if (!date) {
      date = this.cur_sel_date;
    }
    let cIndex = this.cart_items.findIndex(function (obj) {
      return (obj.date === date);
    });
    if (cIndex >= 0) {
      let myIndex = this.cart_items[cIndex].data.findIndex(function (obj) {
        return (obj.item === item && obj.size === size && pThis.sameObj(obj.sub_item, sub_item));
      });

      if (myIndex >= 0) {
        this.cart_items[cIndex].data[myIndex].quant++;
      }
      else {
        this.cart_items[cIndex].data.push({
          item: item,
          item_name: item_name,
          price: price,
          discount: discount,
          discount_per: discount_per,
          size: size,
          quant: quant,
          date: this.cur_sel_date,
          type: type,
          p_veg: p_veg,
          ps_type: ps_type,
          ps_size_id: ps_size_id,
          ps_quant: ps_quant,
          ps_unit: ps_unit,
          sub_item: sub_item
        });
      }

    }
    else {
      let cartData: Array<{ item: number, item_name: string, price: number, discount: number, discount_per: number, size: string, quant: number, date: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string, sub_item: Array<{ item: number, item_name: string, price: number, discount: number, discount_per, number, size: string, quant: number, type: string, p_veg: boolean, ps_type: string, ps_size_id: number, ps_quant: number, ps_unit: string }> }>;
      cartData = [];

      cartData.push({
        item: item,
        item_name: item_name,
        price: price,
        discount: discount,
        discount_per: discount_per,
        size: size,
        quant: quant,
        date: this.cur_sel_date,
        type: type,
        p_veg: p_veg,
        ps_type: ps_type,
        ps_size_id: ps_size_id,
        ps_quant: ps_quant,
        ps_unit: ps_unit,
        sub_item: sub_item
      });
      this.cart_items.push({
        date: date,
        data: cartData
      });
    }
 
     localStorage.setItem("cart", JSON.stringify(this.cart_items));
   }

  removeFromCart(item, size, date?) {
    let pThis = this;
    let cartObj = this.getCartWithDate(date);
    if (!date) {
      date = this.cur_sel_date;
    }
    let cIndex = this.cart_items.findIndex(function (obj) {
      return (obj.date === date);
    });
    if (cIndex >= 0) {
      let index = this.cart_items[cIndex].data.findIndex(function (obj) {
        return (obj.item == item && obj.size == size);
      });

      if (index >= 0) {
        if (this.cart_items[cIndex].data[index].quant > 1) {
          this.cart_items[cIndex].data[index].quant--;
        }
        else {
          this.cart_items[cIndex].data.splice(index, 1);
          if (this.cart_items[cIndex].data.length <= 0) {
            this.cart_items.splice(cIndex, 1);
          }
        }
        localStorage.setItem("cart", JSON.stringify(this.cart_items));
      }
    }
  }

  removeFromCartForDate(date?) {
    if (!date) {
      date = this.cur_sel_date;
    }
    this.cart_items = this.cart_items.reduce((p, c) => (c.date !== date && p.push(c), p), []);

      localStorage.setItem("cart", JSON.stringify(this.cart_items));
    
  }

  getDates() {
    return this.myDates;
  }
  get_curr_sel_date() {
    return this.cur_sel_date;
  }
  get_curr_sel_day() {
    let d = this.cur_sel_date + "";
    let dtObj = new Date(Number(d.substring(0, 4)), Number(d.substring(4,6)) -1 ,Number(d.substring(6,8)))
    return dtObj.getDay();
  }
  showMenuForDate(cDate, cFlag) {
    if (this.menu_init == 2 || this.menu_init == 0) {
      this.iniMenuItem();
    }
    if (cFlag == true) {
      for (let x of this.myDates) {
        if (x.date_obj === cDate) {
          x.sel = true;
          this.cur_sel_date = cDate;
        }
        else {
          x.sel = false;
        }
      
      }
    }
  }

 formatDate(date) {
  var d = date,
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
   if (day.length < 2) day = '0' + day;
   var r = Number(year + month + day);
  return r;
 }

  showDateStr(date?) {
    let d;
    console.log('curtrrrrr date ' + this.cur_sel_date);
    
    if (date) { d = date + "";}
    else { d = this.cur_sel_date + ""; }


    let  r = d.substring(6,8) + " " + this.monthNames[Number(d.substring(4,6))-1];
    return r;
    
  }
    


}
