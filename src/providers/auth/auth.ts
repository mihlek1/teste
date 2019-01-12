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
      this.usuarioCollection = this.db.collection('usuarios', ref => {
        return ref.where('nome', '==', '').where('senha', '==', 'admin');
        
      });
      this.usuario = this.usuarioCollection.valueChanges();
      console.log(this.usuarioCollection.ref.get.name);
      // this.usuarioCollection = this.db.collection('usuarios', ref => {
      //   return ref.where('nome', '==', usuario).where('senha', '==', senha);
      // });
      
      if(usuario === 'admin' && senha === 'admin') {

        this.atualUsuario = {

          nome:usuario,
          role:100

        };

        resolve(true);

      } else if (usuario === 'user' && senha === 'user') {

        this.atualUsuario = {

          nome:usuario,
          role:50

        };

        resolve(true);

      } else {

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

  

}
