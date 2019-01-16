import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';

@Injectable()
export class AuthProvider {

  atualUsuario:Usuarios;
  usuarioCollection : AngularFirestoreCollection<Usuarios>;
  usuario: Observable<Usuarios[]>;

  constructor(private db: AngularFirestore) {

  }

  login(usuario: string, senha:string, user:any ): Promise<boolean> {
    
    return new Promise((resolve, reject) => {


      if(usuario === user.nome && senha === user.senha) {
        console.log(user.nome);
        console.log(user.senha);
        console.log(usuario);
        console.log(senha);
        this.atualUsuario = {
          id:user.id,
          nome:user.nome,
          role:user.role,
          senha:user.senha,
          filial:user.filial
        };
        
        resolve(true);

      } else {
        console.log(user.nome);
        console.log(user.senha);
        console.log(usuario);
        console.log(senha);
        reject(false);

      }

    });

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
