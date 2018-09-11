import { LoginComponent } from './../pages/login/login.component';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.validateUser(this.nativeStorage);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  validateUser(nativeStorage: NativeStorage){
    nativeStorage.getItem('user')
    .then(
      (data) => {
        console.log('user already logged in ', data);        
      },
      (error) => {
        console.log('USer is not logged in');
        this.rootPage = LoginComponent
      }
    )
  }
}
