import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import firebase from 'firebase'
import { environment } from '../environments/firebase.config'

@Component({
  templateUrl: 'app.html'
})
export class PedidosTRD {
  
  //Página inicial do aplicativo com lazy loading
  rootPage: any = 'EntrarPage'

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    
     this.initializeApp()
     firebase.initializeApp(environment.FIREBASE_CONFIG)
  }

   initializeApp() {

     this.platform.ready().then(() => {
       this.statusBar.styleDefault()
       this.splashScreen.hide()
     })

   }

}
