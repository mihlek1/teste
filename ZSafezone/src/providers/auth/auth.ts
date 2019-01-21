import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';
import { ToastController, NavController } from 'ionic-angular';
import { MenuPage } from '../../pages/menu/menu';

@Injectable()
export class AuthProvider {

  atualUsuario:Usuarios;
  usuarioCollection : AngularFirestoreCollection<Usuarios>;
  list;
  user;

  constructor(private db: AngularFirestore, private toastCtrl: ToastController) {

  }

  setUsuario(user) {
    this.atualUsuario = user;
  }
  
  estaLogado() {
    /*Verifica se o usuário está logado ou não */
    if( this.atualUsuario === null || this.atualUsuario === undefined) {
      return false;
    } else {
      return true;
    }

  }


  logout() {
  /*Define o usuário atual como nulo,
    realizando o seu logout, o que retira todo o acesso do aplicativo, 
    pois sempre são realizadas verificações ao entrar nas pages
  */
    this.atualUsuario = null;

  }

}
