import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stagger } from '@angular/core/src/animation/dsl';
import { LoadingController } from 'ionic-angular';



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
    cart_items: Array<{ item: number, item_name: string, price: number, discount:number, discount_per: number, size: string, quant: number, date: Date, type: string, sub_item: Array<{ item: number, item_name: string, price: number, size: string, quant: number, type: string}>}>;

  menu_items: any;
  menu_init: number;
  tax_per: number;
  deliver_ch: number;
  dates: Date[];
  myDates: Array<{ day: string, date: number, date_num: number, date_obj:Date, flag: boolean, sel: boolean }>;
  weekDay: string[];
  cur_sel_date: Date;
  monthNames: string[];
  loader: any;
 // default_sub_item: { item: string, price: number, size: string, quant: number };


  constructor(private http: HttpClient, public loadingCtrl: LoadingController) {
   
    this.menu_init = 0;
    let savedCart = localStorage.getItem("cart");

    if (savedCart != "") {
      this.cart_items = JSON.parse(savedCart);
    }
    else {
      this.cart_items = [];
    }

    this.tax_per = 0.12;
    this.deliver_ch = 0;
 //   this.default_sub_item = {item: 'e', price: 0, size: 'e', quant: 0};

    let start = new Date();
    let end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
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
    if (sel) { this.cur_sel_date = start };

    this.myDates.push({
      day: "TODAY",
      date: start.getDate(),
      date_num: this.formatDate(start),
      date_obj: start,
      flag: flag,
      sel: sel
    })
    let next_date = new Date();
    next_date.setDate(start.getDate() + ++counter);
    flag = (next_date.getDay() == 0 || next_date.getDay() == 6) ? false : true;
    sel = sel_flag ? false : flag;
    if (sel) { this.cur_sel_date = next_date };
    sel_flag = sel_flag ? true : sel;
    this.myDates.push({
      day: "TOMORROW",
      date: next_date.getDate(),
      date_num: this.formatDate(next_date),
      date_obj: next_date,
      flag: flag,
      sel: sel
    })

    while (this.myDates[this.myDates.length - 1].date_obj < end) {
      let my_next_date = new Date();
      my_next_date.setDate(start.getDate() + ++counter);      
      flag = (my_next_date.getDay() == 0 || my_next_date.getDay() == 6) ? false : true;
      sel = sel_flag ? false : flag;
      if (sel) { this.cur_sel_date = my_next_date };
      sel_flag = sel_flag ? true : sel;
      

      this.myDates.push({
        day: this.weekDay[my_next_date.getDay()],
        date: my_next_date.getDate(),
        date_num: this.formatDate(my_next_date),
        date_obj: my_next_date,
        flag: flag,
        sel: sel
      })

    }

    console.log("curr day " + this.cur_sel_date.getDay());
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
      this.http.get("http://dabbalu.com/food_menu.php").subscribe(r => {
        this.loader.dismiss();
        this.menu_items = r;
        this.menu_init = 1;
        console.log("success menu init " + this.menu_init);
      },
        error => {
          this.loader.dismiss();
          this.menu_init = 2;
          console.log("some error menu init " + this.menu_init);
        }
      );
    }
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
   
    console.log("getting menu with type menu init " + this.menu_init);
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
    return this.cart_items
  }

  getCartWithDate() {
    return this.cart_items.filter(item => item.date == this.cur_sel_date);
  }
  
    CartLength(){
      return this.cart_items.length;
    }


  CartLengthForDate() {
    return this.getCartWithDate().length;
  }

  checkItemInCart(item, size) {
    let pThis = this;
    let myIndex = this.cart_items.findIndex(function (obj) {
      return (obj.item === item && obj.size === size && obj.date == pThis.cur_sel_date);
    });
    return myIndex;
  }

  getItemQuantInCart(item, size) {
    let pThis = this;
    let myIndex = this.cart_items.findIndex(function (obj) {
      return (obj.item === item &&  obj.size === size && obj.date == pThis.cur_sel_date);     
    });
    if (myIndex >= 0) {
      return this.cart_items[myIndex].quant;
    }
    else {
      return 0;
    }
    
  }


  cartQuantity() {
    let q: number;
    q = 0;
    for (let x of this.cart_items) {
      q += x.quant
    }
    return Math.round(q);
  }

  cartQuantityForItem(item) {
    let q: number;
    q = 0;
    for (let x of this.cart_items) {
      if (item == x.item && x.date == this.cur_sel_date) {
        q += x.quant;
      }  
    }
    return Math.round(q);
  }

  cartQuantityForThali(itemObj) {
    let pThis = this;
    let q: number;
    q = 0;
    let myIndex = this.cart_items.findIndex(function (obj) {
      return (obj.item === itemObj.item && obj.size === itemObj.size && obj.date == pThis.cur_sel_date && obj.sub_item == itemObj.sub_item );
    });
    if (myIndex > -1) {
      q= this.cart_items[myIndex].quant;
    }
    return Math.round(q);
  }

  cartQuantityForItemSize(itemObj) {
    let pThis = this;
    let q: number;
    q = 0;
    let myIndex = this.cart_items.findIndex(function (obj) {
      return (obj.item === itemObj.item && obj.size === itemObj.size && obj.date == pThis.cur_sel_date);
    });
    if (myIndex > -1) {
      q = this.cart_items[myIndex].quant;
    }
    return Math.round(q);
  }

  cartQuantityForThaliItem(itemObj, subItem) {
    let pThis = this;
    let q: number;
    q = 0;
    let myIndex = this.cart_items.findIndex(function (obj) {
      return (obj.item === itemObj.item && obj.size === itemObj.size && obj.date == pThis.cur_sel_date && obj.sub_item == itemObj.sub_item);
    });

    if (myIndex > -1) {
      
    }
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

  confirmThali(item, item_name, price, discount, discount_per, quant, size,type,subObj) {
    let pThis = this;
    subObj.sort();
    let myIndex = this.cart_items.findIndex(function (obj) {
      return (obj.item === item && obj.size === size && obj.date == pThis.cur_sel_date && pThis.sameObj(obj.sub_item, subObj));
    });
    console.log("my index " + myIndex);

    if (myIndex >= 0) {
      console.log("element already there");
      this.cart_items[myIndex].quant++;
    }
    else {
      this.cart_items.push({
        item: item,
        item_name: item_name,
        price: price,
        discount: discount,
        discount_per: discount_per,
        size: size,
        quant: quant,
        date: this.cur_sel_date,
        type: type,
        sub_item: subObj
      });
    }
    localStorage.setItem("cart", JSON.stringify(this.cart_items));
    console.log("cart " + JSON.stringify(this.cart_items));
  }

  cartPrice() {
    let p: number;
    p = 0;
    for (let x of this.getCartWithDate()) {
      p += (x.price + x.discount) * x.quant;
    }
    return Math.round(p);
  }
  cartPriceAfterDiscount() {
    let p: number;
    p = 0;
    for (let x of this.getCartWithDate()) {
      p += x.price  * x.quant;
    }
    return Math.round(p);
  }
  discountOnCart() {
    let p: number;
    p = 0;
    for (let x of this.getCartWithDate()) {
      p += x.discount * x.quant;
    }
    return Math.round(p);
  }

  taxOnCart() {
    return Math.round(this.cartPriceAfterDiscount() * this.tax_per);
  }
  delieveryChargeOnCart() {
    return Math.round(this.deliver_ch);
  }

  cartPriceTotal() {
    return (this.cartPriceAfterDiscount() + this.taxOnCart() + this.delieveryChargeOnCart()) ;
  }
   
   
  addToCart(item, item_name, price, discount, discount_per, quant, size, type, sub_item) {
    if (!Array.isArray(sub_item)) {
      sub_item = [];
    }

     console.log("print " + item + " " + price + " " + quant + " " + size + " " + this.cur_sel_date);

     let pThis = this;
    let myIndex =   this.cart_items.findIndex(function(obj) {
      return (obj.item === item && obj.size === size && obj.date == pThis.cur_sel_date && pThis.sameObj(obj.sub_item, sub_item));
       });
    console.log("my index "+myIndex);

        if(myIndex>= 0){
          console.log("element already there");
            this.cart_items[myIndex].quant++;
        }
        else{
          this.cart_items.push({
            item: item,
            item_name: item_name,
            price: price,
            discount: discount,
            discount_per: discount_per,
            size: size,
            quant: quant,
            date: this.cur_sel_date,
            type: type,
            sub_item: sub_item
            });
        }
     localStorage.setItem("cart", JSON.stringify(this.cart_items));
     console.log("cart " + JSON.stringify(this.cart_items));
   }

  removeFromCart(item, size) {
    let pThis = this;
    let index = this.cart_items.findIndex(function (obj) {
      return (obj.item == item && obj.size == size && obj.date === pThis.cur_sel_date);
    });
    console.log("removing from cart item: " + item + " size: " + size + " index: " + index);

    if (index >= 0) {
      if (this.cart_items[index].quant > 1) {
        this.cart_items[index].quant--;
      }
      else {
        this.cart_items.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(this.cart_items));
    }
  }

  getDates() {
    return this.myDates;
  }
  get_curr_sel_date() {
    return this.cur_sel_date;
  }
  get_curr_sel_day() {
    return this.cur_sel_date.getDay();
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

  showDateStr() {
    var d = this.cur_sel_date,
      r = d.getDate() + " " + this.monthNames[d.getMonth()];
    return r;
    
  }
    


}
