import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class PedidosTRD {
  
  //Página inicial do aplicativo
  rootPage: any = 'EntrarPage';

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
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
