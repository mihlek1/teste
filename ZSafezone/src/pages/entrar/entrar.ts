import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Item, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Usuarios } from '../../interfaces/usuario.interface';
import { getQueryValue } from '@angular/core/src/view/query';

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
  usuarioCollection : AngularFirestoreCollection<Usuarios>;
  dataLogin;
  testeNull:boolean;
  booleanExecution:boolean;
  userData;



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

    this.booleanExecution === undefined;

    this.booleanf = false;

    //forma alternativa de receber os dados - lista

        //  return { 
        //     id: item.payload.doc.id,
        //     ...item.payload.doc.data()
        //  } as Usuarios;

        // let b = this.usuarioCollection = this.db.collection<Usuarios>('usuarios', ref => {
        //   return ref.where('nome', '==', 'mam').where('senha', '==','123123');
        //  });
        // let a = b.snapshotChanges();
        // a.subscribe(actionArray => {
        // this.list = actionArray.map(item => {
        //     //  return { 
        //     //     id: item.payload.doc.id,
        //     //     ...item.payload.doc.data()
        //     //  } as Usuarios;
        //     this.userData = item.payload.doc.data().nome;

        //    })
        //  });
 

      //validator para o formulário(requer acréscimos e melhorias)
      
      this.formLogin = fb.group({
        nome: ['', Validators.compose([Validators.required])],
        senha: ['', Validators.compose([Validators.required])]
      });
      
  }  
  
   login() {

    let data = this.formLogin.value;
 
    this.usuarioCollection = this.db.collection<Usuarios>('usuarios', ref => {
      return ref.where('nome', '==', data.nome).where('senha', '==', data.senha);
    });

    let a = this.usuarioCollection.snapshotChanges();
    a.subscribe(actionArray => {
      if(actionArray.length === 1) {
        actionArray.map(item => {
          let user = item.payload.doc.data();

          if((item.payload.doc.data().nome === data.nome) && (item.payload.doc.data().senha) === data.senha) {

            let atualUsuario = {
              /*Interface usuários recebendo os dados do documento pesquisado */
              id:user.id,
              nome:user.nome,
              role:user.role,
              senha:user.senha,
              filial:user.filial
            };

            this.authProvider.setUsuario(atualUsuario);
            this.navCtrl.setRoot(MenuPage);
            let toast = this.toastCtrl.create({
              message: 'Seja bem-vindo ' +user.nome,
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          } else {
            
            let toast = this.toastCtrl.create({
              message: 'Falha ao realizar login, confira suas credenciais',
              duration: 2000,
              position: 'bottom'
            });
            toast.present(); 
            this.authProvider.logout();
          }
        });

      } else {
        let toast = this.toastCtrl.create({
          message: 'Falha ao realizar login, confira suas credenciais',
          duration: 2000,
          position: 'bottom'
        });
        toast.present(); 
        this.authProvider.logout();
      }
    });


  }
  
}
