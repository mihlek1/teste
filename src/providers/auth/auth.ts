import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

@Injectable()

//Provedor utilizado para realizar autenticações e verificações de segurança
export class AuthProvider {

    atualUsuario:Usuarios;

  private  usuarioCollection$ : AngularFirestoreCollection<Usuarios>;
  private  usuarioCollection: Observable<any>;

  constructor(
    private db: AngularFirestore, 
    private toastCtrl: ToastController) {

    }
  //PRECISA DE MELHORAR A VERIFICAÇÃO DE CAMPO ÚNICO
  login(data:any):Promise<boolean>{

    return new Promise((resolve, reject) => {
      //busca no banco de dados de acordo com os dados inseridos
      this.usuarioCollection$ = this.db.collection<Usuarios>('usuarios', ref => {

        return ref.where('usuario', '==', data.nome).where('senha', '==', data.senha);
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
              usuario:user.usuario,
              senha:user.senha,
              nome:user.nome,
              estado:user.estado,
              cidade:user.cidade,
              CPF:user.cpf,
              endereco:user.endereco,
              bairro:user.bairro,
              numeroCasa:user.numeroCasa,
              email:user.email,
              telefone:user.telefone,
              role:user.role,
              status:user.status
            };

          });

          resolve(true);
          
        } else {
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
