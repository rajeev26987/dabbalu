import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { IonicPage, NavController, AlertController, ModalController } from 'ionic-angular';

import firebase from 'firebase';



@Component({
    selector: 'authenticationCtrl',
    templateUrl: 'login-modal.component.html'
  })
  export class LoginModalComponent {
    public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    public confirmationResult: firebase.auth.ConfirmationResult;

    phoneNumber: String
    smsCode: number
    codeSent: boolean = false
    /**
     *
     */
    constructor(public alertCtrl: AlertController, public navCtrl: NavController) {
        console.log('ctor called');
    }

    ionViewDidLoad(){
        console.log('ion view loaded');
        this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', 
        { 
            'size': 'invisible', 
            'callback': (response) => {
                console.log(response);
                this.signInWithPhone();
        }
    }); 
    }

    signInWithPhone(){
        console.log(this.recaptchaVerifier);
        firebase.auth().signInWithPhoneNumber('+91' + this.phoneNumber, this.recaptchaVerifier)
            .then(confirmationResult => {
                this.confirmationResult = confirmationResult;
                this.codeSent = true;
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
                // let prompt = this.alertCtrl.create(
                //     {
                //         title: 'Enter SMS code',
                //         subTitle: 'SMS code us sent to +919535633770.',
                //         buttons: [
                //             {
                //                 text: 'Submit',
                //                 handler: data => {
                //                     console.log(data);
                //                     confirmationResult.confirm(data.confirmationCode)
                //                     .then(function (result) {
                //                         // User signed in successfully.
                //                         console.log(result.user);
                //                         // ...
                //                     }).catch(function (error) {
                //                         // User couldn't sign in (bad verification code?)
                //                         // ...
                //                     });
                //                 }
                //             }],

                //     }
                // );
                // prompt.present();
            })
            .catch(function (error) {
                console.error("SMS not sent", error);
            });
    }

    completeSignIn(){
        this.confirmationResult.confirm(this.smsCode.toString())
        .then(success => {
            console.log(success);
            this.navCtrl.push(HomePage);
        }).catch(err => {
            console.log(err);
            alert('SMS Code not valid');
        })
    }

  }