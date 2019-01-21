import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

@Injectable()
export class AuthProvider {

    atualUsuario:Usuarios;

  private  usuarioCollection$ : AngularFirestoreCollection<Usuarios>;
  private  usuarioCollection: Observable<any>;

  constructor(
    private db: AngularFirestore, 
    private toastCtrl: ToastController) {

    }
  
  login(usuario: string, senha:string ):Promise<boolean>{
    if(this.atualUsuario != undefined && this.atualUsuario != null) {

    } else {

      return new Promise((resolve, reject) => {
        //busca no banco de dados de acordo com os dados inseridos
        this.usuarioCollection$ = this.db.collection<Usuarios>('usuarios', ref => {

          return ref.where('nome', '==', usuario).where('senha', '==', senha);
        });
        //collection vira observable
        this.usuarioCollection = this.usuarioCollection$.snapshotChanges();

        //subscribe observer receber os dados
        this.usuarioCollection.subscribe(actionArray => {

          if(actionArray.length === 1) {

          /*Teste para verificar se o array não traz nenhum resultado, 
            e caso isso aconteça, não existe nenhum usuário com o nome digitado 
          */
            actionArray.map(item => {

              /*Dados do array específicos */
              let user = item.payload.doc.data();

              /*Definindo o usuário atual do sistema, sendo realizado o seu login e logout a partir do mesmo */
              this.atualUsuario = {
                /*Interface usuários recebendo os dados do documento pesquisado */
                id:user.id,
                nome:user.nome,
                role:user.role,
                senha:user.senha,
                filial:user.filial
              };
  
            });

            resolve(true);
            
          } else {
            reject(false);
            
          } 
  
        });
        
      });
    }

  }


  estaLogado(){
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
