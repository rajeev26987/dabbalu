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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
      AccountPage,
      HomePage,
    TabsPage,
    SetQuantPage,
    SetThaliQuantPage,
    SelectThaliPage,
    SelThaliMenuPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    AccountPage,
    HomePage,
    TabsPage,
    SetQuantPage,
    SetThaliQuantPage,
    SelectThaliPage,
    SelThaliMenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppProvider,
    ThaliProvider
  ]
})
export class AppModule {}