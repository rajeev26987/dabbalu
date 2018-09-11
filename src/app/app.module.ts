import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppProvider } from '../providers/app/app';
import { SetQuantPage } from '../pages/set-quant/set-quant';
import { SelectThaliPage } from '../pages/select-thali/select-thali';
import { SelThaliMenuPage } from '../pages/sel-thali-menu/sel-thali-menu';
import { ThaliProvider } from '../providers/app/thali';
import { SetThaliQuantPage } from '../pages/set-thali-quant/set-thali-quant';
import { MyhomePage } from '../pages/myhome/myhome';
import { EditSchedulePage } from '../pages/edit-schedule/edit-schedule';
import { SchedulePage } from '../pages/schedule/schedule';
import { PaymentPage } from '../pages/payment/payment';
import { CartPage } from '../pages/cart/cart';

import { LoginComponent } from '../pages/login/login.component';
import { NativeStorage } from '@ionic-native/native-storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';
import { LoginModalComponent } from '../pages/login/login-modal.component';
import { UserModalComponent } from '../pages/account/user-modal.component';

export const firbaseConfig = {
  apiKey: "AIzaSyBL_ADpVlhSODGbSn6AwXRx7dhobd1ocWk",
    authDomain: "dabbalu-9947a.firebaseapp.com",
    databaseURL: "https://dabbalu-9947a.firebaseio.com",
    projectId: "dabbalu-9947a",
    storageBucket: "dabbalu-9947a.appspot.com",
    messagingSenderId: "19063399741"
}

firebase.initializeApp(firbaseConfig);

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SchedulePage,
    ContactPage,
    CartPage,
    PaymentPage,
      AccountPage,
    HomePage,
      MyhomePage,
    TabsPage,
    SetQuantPage,
    SetThaliQuantPage,
    SelectThaliPage,
    SelThaliMenuPage,
    EditSchedulePage,
    LoginComponent,
    LoginModalComponent,
    UserModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firbaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    SchedulePage,
    ContactPage,
    CartPage,
    PaymentPage,
    AccountPage,
    HomePage,
    MyhomePage,
    TabsPage,
    SetQuantPage,
    SetThaliQuantPage,
    SelectThaliPage,
    SelThaliMenuPage,
    EditSchedulePage,
    LoginComponent,
    LoginModalComponent,
    UserModalComponent
  ],
  providers: [
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    AuthProvider,
    AppProvider,
    ThaliProvider
  ]
})
export class AppModule {}
