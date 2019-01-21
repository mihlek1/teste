import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { RegistroUsuarioPage } from '../registro-usuario/registro-usuario';
import { ListagemPedidoPage } from '../listagem-pedido/listagem-pedido';
import { RegistroPedidoPage } from '../registro-pedido/registro-pedido';
import { MenuContentPage } from '../menu-content/menu-content';
import { ListagemUsuarioPage } from '../listagem-usuario/listagem-usuario';
import { RegistroClientePage } from '../registro-cliente/registro-cliente';
import { ListagemClientePage } from '../listagem-cliente/listagem-cliente';

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
    let a = this.authProvider.atualUsuario.role;
    if(a === 'Admin'){
    
      this.pages=[
        {title:'Início', component:MenuPage},
        {title:'Registro de Usuário', component:RegistroUsuarioPage},        
        {title:'Usuários', component:ListagemUsuarioPage},
        {title:'Adicione um Pedido', component:RegistroPedidoPage},
        {title:'Pedidos', component:ListagemPedidoPage},
        {title:'Clientes', component:ListagemClientePage},
        {title:'Adicione um Cliente', component:RegistroClientePage}
      ];

      this.openPage(MenuContentPage);
    
    } else if(a === 'Vendedor') {

      this.pages=[
        {title:'Início', component:MenuPage},
        {title:'Pedidos', component:ListagemPedidoPage},
        {title:'Adicione um Pedido', component:RegistroPedidoPage},
        {title:'Clientes', component:ListagemClientePage},
        {title:'Adicione um Cliente', component:RegistroClientePage}

      ];

      this.openPage(MenuContentPage);

    } else if(a === 'Supervisor') {

      this.pages=[
        {title:'Início', component:MenuPage},
        {title:'Pedidos', component:ListagemPedidoPage},
        {title:'Adicione um Pedido', component:RegistroPedidoPage}

      ];

      this.openPage(MenuContentPage);

    } else if(a === 'Faturamento') {

      this.pages=[
        {title:'Início', component:MenuPage},
        {title:'Pedidos', component:ListagemPedidoPage}
      ];

      this.openPage(MenuContentPage);

    }

  }

  logout() {

    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot(EntrarPage);
    let toast = this.toastCtrl.create({
      message: 'O logout foi realizado',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
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
      toast.present();
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

