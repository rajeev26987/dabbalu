import { AuthProvider } from './../../providers/auth/auth';
import { IonicPage, ModalController } from 'ionic-angular';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { LoginModalComponent } from './login-modal.component';


@Component({
    selector: 'dabbalu-login',
    templateUrl: 'login.component.html'
  })
  export class LoginComponent {
    userData:any;
	loginData = { email:'', password:'' };
	authForm : FormGroup;
	email: AbstractControl;
	password: AbstractControl;
  passwordtype:string='password';
  passeye:string ='eye';
    constructor(formBuilder: FormBuilder, public authProvider: AuthProvider, public modalCtrl: ModalController) {
      this.authForm = formBuilder.group({
        'email' : [null, Validators.compose([Validators.required])],
        'password': [null, Validators.compose([Validators.required])],
      });
      this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
    }    

    onLoginClick(socialAuthProvider: String){
      this.authProvider.loginSocialAccount(socialAuthProvider);
    }

    moveToRegister(){

    }

    userLogin(formData: any){
      this.authProvider.loginUser(this.email.value, this.password.value);
    }

    forgotPassword(){
      console.log('login clicked');
    }

    loginViaSms(){
      let modal = this.modalCtrl.create(LoginModalComponent, null, { showBackdrop: true, enableBackdropDismiss: true, cssClass: 'modal' });
      modal.present();
    }
  }