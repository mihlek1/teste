import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';

/**
 * Generated class for the MenuContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    
    let bool =this.authProvider.estaLogado();

    if (!bool) {

      this.navCtrl.setRoot(EntrarPage);

      let toast = this.toastCtrl.create({
        message: 'Você não possui acesso à essa página',
        duration: 2000,
        position: 'bottom'
      });

    }       

    return bool;
 
 }

}