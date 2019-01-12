import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';

/**
 * Generated class for the BalancaRegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-balanca-registro',
  templateUrl: 'balanca-registro.html',
})
export class BalancaRegistroPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertCtrl: AlertController) {
  }

  ionViewCanEnter() {
    
    let bool =this.authProvider.estaLogado();

    if (!bool) {

      this.navCtrl.setRoot(EntrarPage);

      let alert = this.alertCtrl.create({
        title:'Falha de acesso',
        message:'Você não possui acesso à essa página',
        buttons:['OK!']
      });
      alert.present();

    }       

    return bool;
 
 }

}


