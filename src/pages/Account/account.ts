import { AddressesComponent } from './address/addresses.component';
import { UserModalComponent } from './user-modal.component';
import  { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'  
})
export class AccountPage { 
  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    
  }    

  editProfile(){
    let modal = this.modalCtrl.create(UserModalComponent, null, { showBackdrop: true, enableBackdropDismiss: true, cssClass: 'modal-halfscreen'});
    modal.present(); 
  } 

  redirectToAddress(){
    this.navCtrl.push(AddressesComponent);
  }
 
  editAddress(){
     
  }

  saveChanges(){

  }
   
}
