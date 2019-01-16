import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Item, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class EntrarPage {

  show:boolean;
  booleanf: boolean;
  formLogin: FormGroup; 
  username:string;
  usuarioArray;
  usuarioCollection : AngularFirestoreCollection<Usuarios>;
  usuario: Observable<Usuarios[]>;
  dataLogin;
  list;
  observe$:Observable<any>;
  constructor(
    private db:AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authProvider: AuthProvider,
    private toastCtrl:ToastController,
    private cdRef : ChangeDetectorRef) {

    this.booleanf = false;

      //forma alternativa de receber os dados - lista

      
       let a = this.db.collection('usuarios').snapshotChanges();

       a.subscribe(actionArray => {
       this.list = actionArray.map(item => {
            return { 
               id: item.payload.doc.id,
               ...item.payload.doc.data()
            } as Usuarios;
          })
        });
      console.log(a);

      //validator para o formulário(requer acréscimos e melhorias)
      this.formLogin = fb.group({
        nome: ['', Validators.compose([Validators.required])],
        senha: ['', Validators.compose([Validators.required])]
      });
      
  }


  receberUsuario(user){
    if(this.booleanf === false) {
      let existe = document.getElementById("dataSend");
      console.log(existe);
      console.log(user);  
      this.booleanf=true;
      this.login(user);
    } 
  }

  login(user) {
    this.authProvider.login(this.dataLogin.nome, this.dataLogin.senha, user).then(success => {
      if(success) {   
        this.navCtrl.setRoot(MenuPage);
      }
      let toast = this.toastCtrl.create({
        message: 'Seja bem-vindo ' +this.dataLogin.nome,
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

  getForm() {
    let data = this.formLogin.value;
 
    this.usuarioCollection = this.db.collection<Usuarios>('usuarios', ref => {
      return ref.where('nome', '==', data.nome).where('senha', '==', data.senha);
     });
     this.usuario = this.usuarioCollection.valueChanges(); 

     this.dataLogin = data;
     
     let existe = document.getElementById("dataSend");
     console.log(existe);
     console.log(existe);
     console.log(existe);

  }
  
}
