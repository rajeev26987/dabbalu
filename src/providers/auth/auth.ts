import { NativeStorage } from '@ionic-native/native-storage';
import { firbaseConfig } from './../../app/app.module';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { UserCredential } from '@firebase/auth-types';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthProvider {
  private webClientId: String
  private nativeStorageInst: NativeStorage

  constructor(public googlePlus: GooglePlus, private nativeStorage: NativeStorage) {
    this.webClientId = '19063399741-j9lvbk386087dltg4s2opjo8judg0eo1.apps.googleusercontent.com';
    this.nativeStorageInst = nativeStorage;
  }

  loginUser(email: string, password: string) {     
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => { 
        console.log(result);
        this.nativeStorageInst.setItem("user", result);
      }).catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(error);
      });
  }

  loginSocialAccount(socialAuthProvider: String){
    if(socialAuthProvider){
      switch (socialAuthProvider) {
        case 'google':
          this.loginGoogleUser();          
          break;
        case 'facebook':
          this.loginFbUser();
          break;      
        default:
          break;
      }
    }
  }

  loginFbUser(){
    return this.googlePlus.login({
      'webclientId': this.webClientId,
      offline: true
    }).then(result => {
      firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken))
    }).then(success => {
      
    }).catch(error => {

    }); 
  }

  loginGoogleUser(){
    return this.googlePlus.login({
      'webclientId': this.webClientId,
      offline: true
    }).then(result => {
      firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken))
    }).then(success => {

    }).catch(error => {

    }); 
  }

  logOut(){

  }
}