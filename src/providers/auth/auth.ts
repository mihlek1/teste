import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';

@Injectable()
export class AuthProvider {

  atualUsuario:Usuario;
  usuarioCollection : AngularFirestoreCollection<Usuarios>;
  usuario: Observable<Usuarios[]>;

  constructor(private db: AngularFirestore) {

  }

  login(usuario: string, senha:string ): Promise<boolean> {

    return new Promise((resolve, reject) => {
      
      if(usuario === 'admin' && senha === 'admin') {

        this.atualUsuario = {

          nome:usuario,
          role:100

        };

        resolve(true);

      } else if (usuario === 'user' && senha === 'user') {

        this.atualUsuario = {

          nome:usuario,
          role:1

        };

        resolve(true);

      } else if (usuario === 'supervisor' && senha === 'supervisor') {

        this.atualUsuario = {

          nome:usuario,
          role:50

        };

        resolve(true);

      } else if (usuario === 'vendedor' && senha === 'vendedor') {

        this.atualUsuario = {

          nome:usuario,
          role:25

        };

        resolve(true);

      } else if (usuario === 'financeiro' && senha === 'financeiro') {

        this.atualUsuario = {

          nome:usuario,
          role:75

        };

        resolve(true);

      }
       else {

        reject(false);

      }

    })

  }

  estaLogado(){

    if( this.atualUsuario === null || this.atualUsuario === undefined) {
      return false;
    } else {
      return true;
    }

  }

  logout() {

    this.atualUsuario = null;

  }

  acessoAdmin() {
    if(this.estaLogado()){
      if(this.atualUsuario.role === 100) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }    
  }

  acessoSupervisor() {
    if(this.estaLogado()){
      if(this.atualUsuario.role === 50) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }    
  }

  acessoFinanceiro() {
    if(this.estaLogado()){
      if(this.atualUsuario.role === 75) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }    
  }
  acessoVendedor() {
    if(this.estaLogado()){
      if(this.atualUsuario.role === 25) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }    
  }

}
