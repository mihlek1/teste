import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Item, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';

@IonicPage()
@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class EntrarPage {

  formLogin: FormGroup; 
  username:string;
  
  usuarioCollection : AngularFirestoreCollection<Usuarios>;
  usuario: Observable<Usuarios[]>;
  ab:string[];
  list: Usuarios[];
 

  constructor(
    private db:AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authProvider: AuthProvider,
    private toastCtrl:ToastController) {

       let a = this.db.collection('usuarios').snapshotChanges();

      a.subscribe(actionArray => {
      this.list = actionArray.map(item => {
           return { 
              id: item.payload.doc.id,
              ...item.payload.doc.data()
           } as Usuarios;
         })
       });

      //this.list.values();


       this.usuarioCollection = this.db.collection<Usuarios>('usuarios', ref => {
         
         return ref.where('nome', '==', 'admin').where('senha', '==', 'admin');
       });

       this.usuario = this.usuarioCollection.valueChanges();

       this.formLogin = fb.group({
        nome: ['', Validators.compose([Validators.required])],
        senha: ['', Validators.compose([Validators.required])]
      });
  
  }
  
  login() {
    
    let data = this.formLogin.value;

    this.authProvider.login(data.nome, data.senha).then(success => {
        if(success) {      
          this.navCtrl.setRoot(MenuPage);
        }
        let toast = this.toastCtrl.create({
          message: 'Seja bem-vindo ' +data.nome,
          duration: 3000,
          position: 'bottom'
        });
        toast.present(); 
      }).catch (err => {
        let toast = this.toastCtrl.create({
          message: 'Falha ao realizar login, confira suas credenciais',
          duration: 3000,
          position: 'bottom'
        });
        toast.present(); 
      });

    }

}
