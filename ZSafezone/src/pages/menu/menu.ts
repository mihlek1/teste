import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { RegistroUsuarioPage } from '../registro-usuario/registro-usuario';
import { ListagemPedidoPage } from '../listagem-pedido/listagem-pedido';
import { RegistroPedidoPage } from '../registro-pedido/registro-pedido';
import { MenuContentPage } from '../menu-content/menu-content';
import { ListagemUsuarioPage } from '../listagem-usuario/listagem-usuario';

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
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {

  }

  ionViewWillEnter() {
  /*1- Ao entrar na página, o ionic automaticamente verifica se o acesso será permitido, a partir do usuarioAtual do arquivo auth.ts
    2- Também são verificadas as roles para definir qual páginas determinado usuário poderá acessar
    3- Mais funcionalidades deverão ser implementadas aqui, provavelmente, eu acho, não sei, enfim
  */
    if(this.authProvider.atualUsuario.role === 'Admin'){
    
      this.pages=[
        {title:'Menu', component:MenuPage},
        {title:'Registro de Usuário', component:RegistroUsuarioPage},        
        {title:'Gerenciamento de Usuários', component:ListagemUsuarioPage},
        {title:'Registro de Pedidos', component:RegistroPedidoPage},
        {title:'Consultar Pedidos', component:ListagemPedidoPage},

      ];

      this.openPage(MenuContentPage);
    
    } else if(this.authProvider.atualUsuario.role === 'Vendedor') {

      this.pages=[
        {title:'Menu', component:MenuPage},
        {title:'Consultar Pedidos', component:ListagemPedidoPage},
        {title:'Gerar Pedidos', component:RegistroPedidoPage}

      ];

      this.openPage(MenuContentPage);

    } else if(this.authProvider.atualUsuario.role === 'Supervisor') {

      this.pages=[
        {title:'Menu', component:MenuPage},
        {title:'Consultar Pedidos', component:ListagemPedidoPage},
        {title:'Gerar Pedidos', component:RegistroPedidoPage}

      ];

      this.openPage(MenuContentPage);

    } else if(this.authProvider.atualUsuario.role === 'Financeiro') {

      this.pages=[
        {title:'Menu', component:MenuPage},
        {title:'Consultar Pedidos', component:ListagemPedidoPage}
      ];

      this.openPage(MenuContentPage);

    }

  }

  logout() {

    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot(EntrarPage);

  }

  ionViewCanEnter() {
    
    let bool =this.authProvider.estaLogado();

    if (!bool) {

      this.navCtrl.setRoot(EntrarPage);

      let toast = this.toastCtrl.create({
        message: 'Você não possui acesso à essa página',
        duration: 3000,
        position: 'bottom'
      });

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

