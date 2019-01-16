import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EntrarPage } from '../pages/entrar/entrar';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = EntrarPage;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    private authProvider:AuthProvider, 
    public splashScreen: SplashScreen) {
    
     this.initializeApp();
  }

   initializeApp() {
     this.platform.ready().then(() => {
       this.statusBar.styleDefault();
       this.splashScreen.hide();
     });
   }

}
