import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stagger } from '@angular/core/src/animation/dsl';



/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThaliProvider {
 
  thali_item: Array<{ item: string, price: number, size: string, quant: number, type: string }>;
  discount_per: number;

  constructor(private http: HttpClient) {
    this.discount_per = 0.05;

  }

  clearThaliItem() {
    this.thali_item = [];
  }

  getThali() {
    return this.thali_item;
  }

 
  thaliPrice() {
    let p: number;
    p = 0;
    for (let x of this.thali_item) {
      p += x.price * x.quant;
    }
    return Math.round(p);
  }

  thaliLength() {
    return this.thali_item.length;
  }


  discountOnThali() {
    return Math.round( this.discount_per * this.thaliPrice());
  }

  thaliPriceTotal() {
    return Math.round( this.thaliPrice() - this.discountOnThali());
  }

  getThaliListForItemType(type) {
    
    if (type == 'b' || type == 'r') {
      return this.thali_item.filter(item => item.type == 'r' || item.type == 'b');
    }
    else {
      return this.thali_item.filter(item => item.type == type);
      }
   
  }

  addToThali(item, price, quant, size, type, flag?) {

    if (flag == "i") { }
    else {
      if (size == "medium") {
        price = price * 1.2;
      }
      else if (size == 'large') {
        price = price * 1.4;
      }
      else if (size == 'large') {
        price = price * 1.4;
      }
      else if (size == 'pack of 5' || size == 'full') {
        price = price * 1.5;
      }
      price = Math.round(price);
    }
    let pThis = this;
    let myIndex = this.thali_item.findIndex(function (obj) {
      return (obj.item === item && obj.size === size);
    });
    console.log("my index " + myIndex);

    if (myIndex >= 0) {
      console.log("element already there");
      this.thali_item[myIndex].quant++;
    }
    else {
      this.thali_item.push({
        item: item,
        price: price,
        size: size,
        quant: quant,
        type: type
      });
    }

    console.log("cart " + JSON.stringify(this.thali_item));
  }

  removeFromThali(item, size) {
    let pThis = this;
    let index = this.thali_item.findIndex(function (obj) {
      return (obj.item === item && obj.size === size);
    });
    console.log("removing from cart item: " + item + " size: " + size + " index: " + index);

    if (index >= 0) {
      if (this.thali_item[index].quant > 1) {
        this.thali_item[index].quant--;
      }
      else {
        this.thali_item.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(this.thali_item));
    }
  }

  cartQuantityForThaliItem(item) {
    let q: number;
    q = 0;
    for (let x of this.thali_item) {
      if (item == x.item) {
        q += x.quant;
      }
    }
    return Math.round(q);
  }

  cartQuantityForThaliItemType(type) {
    let q: number;
    q = 0;
    for (let x of this.thali_item) {
      if (type == x.type) {
        q += x.quant;
      }
    }
    return Math.round(q);
  }

  getItemQuantInThali(item, size) {
    let pThis = this;
    let myIndex = this.thali_item.findIndex(function (obj) {
      return (obj.item === item && obj.size === size);
    });
    if (myIndex >= 0) {
      return this.thali_item[myIndex].quant;
    }
    else {
      return 0;
    }

  }
}
