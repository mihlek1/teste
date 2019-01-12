import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { app } from 'firebase';
import { BalancaRegistroPage } from '../balanca-registro/balanca-registro';
import { RegistroUsuarioPage } from '../registro-usuario/registro-usuario';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {


  @ViewChild(Nav) nav: Nav;


  pages: Array<{title: string, component: any}>;
  user:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private appCtrl: App,
    private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {

    if(this.authProvider.acessoAdmin()){
    
      this.pages=[
        {title:'Registro', component:RegistroUsuarioPage}
      ];

      this.openPage(BalancaRegistroPage);
    
    } else {

      this.pages=[
        {title:'Balanca', component:BalancaRegistroPage}
      ];

      this.openPage(BalancaRegistroPage);

    }
    this.user = this.authProvider.atualUsuario.nome;
  }

  logout() {

    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot(EntrarPage);

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


  openPage(page) {

    this.nav.setRoot(page);

  }
  openPage2(page) {

    this.nav.setRoot(page.component);

  }




}
