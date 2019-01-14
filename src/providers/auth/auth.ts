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
          role:'admin'

        };

        resolve(true);

      } else if (usuario === 'supervisor' && senha === 'supervisor') {

        this.atualUsuario = {

          nome:usuario,
          role:'supervisor'

        };

        resolve(true);

      } else if (usuario === 'vendedor' && senha === 'vendedor') {

        this.atualUsuario = {

          nome:usuario,
          role:'vendedor'

        };

        resolve(true);

      } else if (usuario === 'financeiro' && senha === 'financeiro') {

        this.atualUsuario = {

          nome:usuario,
          role:'financeiro'

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
      if(this.atualUsuario.role === 'admin') {
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
      if(this.atualUsuario.role === 'supervisor') {
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
      if(this.atualUsuario.role === 'financeiro') {
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
      if(this.atualUsuario.role === 'vendedor') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }    
  }

}
