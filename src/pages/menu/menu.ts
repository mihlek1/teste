import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App, ToastController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {


  @ViewChild(Nav) nav: Nav;


  private pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private appCtrl: App,
    private toastCtrl: ToastController) {

  }

  ionViewWillEnter() {
  /*1- Ao entrar na página, o ionic automaticamente verifica se o acesso será permitido, a partir do usuarioAtual do arquivo auth.ts
    2- Também são verificadas as roles para definir qual páginas determinado usuário poderá acessar
    3- Mais funcionalidades deverão ser implementadas aqui, provavelmente, eu acho, não sei, enfim
  */

    let roleUsuarioAtual = this.authProvider.atualUsuario.role;

    if(roleUsuarioAtual === 'Admin'){
    
      this.pages=[
        {title:'Início', component:'MenuPage'},
        {title:'Usuários', component:'ListagemUsuarioPage'},
        {title:'Registro de Usuário', component:'RegistroUsuarioPage'},        
        {title:'Pedidos', component:'ListagemPedidoPage'},
        {title:'Adicione um Pedido', component:'RegistroPedidoPage'},
        {title:'Pré-Cadastro de Cliente', component:'RegistroClientePage'},
      ];
    
    } else if(roleUsuarioAtual === 'Vendedor') {

      this.pages=[
        {title:'Início', component:'MenuPage'},
        {title:'Pedidos', component:'ListagemPedidoPage'},
        {title:'Adicione um Pedido', component:'RegistroPedidoPage'},
        {title:'Pré-Cadastro de Cliente', component:'RegistroClientePage'},

      ];

    } else if(roleUsuarioAtual === 'Supervisor') {

      this.pages=[
        {title:'Início', component:'MenuPage'},
        {title:'Pedidos', component:'ListagemPedidoPage'},
        {title:'Adicione um Pedido', component:'RegistroPedidoPage'}
      ];

    } else if(roleUsuarioAtual === 'Faturamento') {

      this.pages=[
        {title:'Início', component:'MenuPage'},
        {title:'Pedidos', component:'ListagemPedidoPage'}
      ];

    }

    this.openPage('MenuContentPage');
    
  }

  logout() {

    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot('EntrarPage');
    let toast = this.toastCtrl.create({
      message: 'O logout foi realizado',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();

  }

  ionViewCanEnter() {
 
  }


  openPage(page) {

    this.nav.setRoot(page);

  }

  openMenu(page) {

    this.nav.setRoot(page.component);

  }




}

