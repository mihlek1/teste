import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AuthProvider {

  atualUsuario:Usuarios;
  usuarioCollection : AngularFirestoreCollection<Usuarios>;
  list;
  user;

  constructor(private db: AngularFirestore, private toastCtrl: ToastController) {

  }

  /*Recebe os dados do form presente no entrar.html,
    que realiza a chamada da função login() no entrar.ts, 
    e a partir dessa função, recebe os dados do form e as insere nessa função abaixo
  */
  login(usuario: string, senha:string ): Promise<boolean> {

    this.usuarioCollection = this.db.collection<Usuarios>('usuarios', ref => {
      return ref.where('nome', '==', usuario).where('senha', '==', senha);
    });

    let a = this.usuarioCollection.snapshotChanges();
    

    return new Promise((resolve, reject) => {

      a.subscribe(actionArray => {
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
          
        } else if(actionArray.length === 0){
          /*Teste para verificar se o array não traz nenhum resultado, 
            e caso isso aconteça, não existe nenhum usuário com o nome digitado 
          */
          reject(false);
          
        } else {
          /*Teste para verificar se o array traz mais de um resultado, 
            e caso traga, existem dois usuarios com o mesmo nome => Erro crítico 
          */
          let toast = this.toastCtrl.create({
            message: 'ERRO CRÍTICO, NOME DE USUÁRIO JÁ UTILIZADO',
            duration: 5000,
            position: 'top'
          });
          toast.present(); 

          reject(false);

        }

      });

    });

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
