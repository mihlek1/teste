import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class EntrarPage {

  //Recebe o formLogin declarado no HTML
  private formLogin: FormGroup; 

  constructor(
    public  navCtrl: NavController, 
    public  navParams: NavParams,
    private fb: FormBuilder,
    private authProvider: AuthProvider,
    private toastCtrl:ToastController) {

      //Validação para formulário, requer melhorias      
      this.formLogin = this.fb.group({
        nome: ['', Validators.compose([Validators.required])],
        senha: ['', Validators.compose([Validators.required])]
      });
      
  }  
  
  //Recebe os dados inseridos (usuário e senha) 
  //Chama a função login do AuthProvider (provedor importado e declarado no construtor)
  login() {

    let data = this.formLogin.value;
    this.formLogin.reset();
    
      this.authProvider.login(data).then(success => {
        if(success) {   
          this.navCtrl.setRoot('MenuPage');
          let toast = this.toastCtrl.create({
            message: 'Seja bem-vindo ' +data.nome,
            duration: 1350,
            position: 'bottom'
          });
          toast.present(); 
        } 
      }).catch (err => {
        let toast = this.toastCtrl.create({
          message: 'Falha ao realizar login, confira suas credenciais',
          duration: 4000,
          position: 'bottom'
        });
        toast.present(); 
      }); 
  }

}
