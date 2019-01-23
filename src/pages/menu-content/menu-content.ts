import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-menu-content',
  templateUrl: 'menu-content.html',
})
export class MenuContentPage {
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ionViewCanEnter() {
     
  }

}