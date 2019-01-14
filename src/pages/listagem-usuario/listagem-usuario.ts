import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Item } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';


@IonicPage()
@Component({
  selector: 'page-listagem-usuario',
  templateUrl: 'listagem-usuario.html',
})
export class ListagemUsuarioPage {


  usuarioCollection : AngularFirestoreCollection<Usuarios>;
  usuario: Observable<Usuarios[]>;
  ab:string[];
  list: Usuarios[];
  asd:string;

  constructor(   private db:AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authProvider: AuthProvider) {

      let a = this.db.collection('usuarios').snapshotChanges();

      a.subscribe(actionArray => {
        this.list = actionArray.map(item => {
          return { 
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Usuarios;
        })
      });
  }
}
