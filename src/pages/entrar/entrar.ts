import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Item, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPage } from '../menu/menu';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class EntrarPage {

  private formLogin: FormGroup; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authProvider: AuthProvider,
    private toastCtrl:ToastController,
    ) {

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
      this.authProvider.login(data.nome, data.senha).then(success => {
        if(success) {   
          this.navCtrl.setRoot(MenuPage);
          let toast = this.toastCtrl.create({
            message: 'Seja bem-vindo ' +data.nome,
            duration: 2000,
            position: 'bottom'
          });
          toast.present(); 
        } 
      }).catch (err => {
        data = null;  
        let toast = this.toastCtrl.create({
          message: 'Falha ao realizar login, confira suas credenciais',
          duration: 2000,
          position: 'bottom'
        });
        toast.present(); 
      }); 

  }

}
