import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';


@IonicPage()
@Component({
  selector: 'page-listagem-usuario',
  templateUrl: 'listagem-usuario.html',
})
export class ListagemUsuarioPage {


  private usuarioCollection : AngularFirestoreCollection<Usuarios>;
  private usuario: Observable<Usuarios[]>;

  constructor(   
    private db:AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder,
    private alertCtrl: AlertController ) {

      this.usuarioCollection = this.db.collection<Usuarios>('usuarios');      
      this.usuario = this.usuarioCollection.valueChanges();
      
  }




  editar(user) {
    let alert = this.alertCtrl.create({
      title: 'Editar usuário',
      inputs:[
        {
        name: 'nome',
        value: user.nome,
        placeholder: 'Nome'
        },
        {
        name: 'role',
        value: user.role,
        placeholder: 'Acesso'
        },
        {
        name: 'senha',
        value: user.senha,
        placeholder: 'Senha',
        type: 'password'
        },
        {
        name: 'filial',
        value: user.filial,
        placeholder: 'Senha'
        },
      ],
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Atualizar',
          handler: data => {
            this.db.doc('usuarios/'+user.id).update(data);
          }
        }
      ]
    });
    alert.present();
  }

  deletar(user) {
    this.db.doc('usuarios/'+user.id).delete();
  }

}
