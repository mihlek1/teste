import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MenuPage } from '../menu/menu';
import { Usuarios } from '../../interfaces/usuario.interface';



@IonicPage()
@Component({
  selector: 'page-registro-usuario',
  templateUrl: 'registro-usuario.html',
})
export class RegistroUsuarioPage {


  private formRegistro: FormGroup; 

  private usuarioCollection : AngularFirestoreCollection<Usuarios>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    fb: FormBuilder,
    private db: AngularFirestore,
    private toastCtrl: ToastController) {

      this.usuarioCollection = this.db.collection('usuarios');

      this.formRegistro = fb.group({
        usuario: ['', Validators.compose([Validators.required])],
        senha: ['', Validators.compose([Validators.required])],
        nome: ['', Validators.compose([Validators.required])],
        estado: ['', Validators.compose([Validators.required])],
        cidade: ['', Validators.compose([Validators.required])],
        CPF: ['', Validators.compose([Validators.required])],
        endereco: ['', Validators.compose([Validators.required])],
        bairro: ['', Validators.compose([Validators.required])],
        numeroCasa: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        telefone: ['', Validators.compose([Validators.required])],
        role: ['', Validators.compose([Validators.required])]
      });

  }
  registro() {

    let bool = this.authProvider.atualUsuario.role === 'Admin';


    if (!bool) {
      this.navCtrl.setRoot('EntrarPage');

      let toast = this.toastCtrl.create({
        message: 'Você não possui acesso à essa funcionalidade',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();

    } else {
      
      this.navCtrl.setRoot('MenuPage');

      let data = this.formRegistro.value;

      this.usuarioCollection.add(data).then(result => {
  
        this.db.doc('usuarios/'+result.id).update({id:result.id});

        let toast = this.toastCtrl.create({
          message: 'Usuário cadastrado com sucesso',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
   
      }).catch(err => {

        let toast = this.toastCtrl.create({
          message: 'O cadastro falhou, erro: '+err,
          duration: 4000,
          position: 'bottom'
        });
        
        toast.present();
        
      });

    }

  }
  
  ionViewCanEnter() {
    
    let bool =this.authProvider.atualUsuario.role === 'Admin';

    if (!bool) {
      this.navCtrl.setRoot('EntrarPage');

      let toast = this.toastCtrl.create({
        message: 'Você não possui acesso à essa página',
        duration: 2000,
        position: 'bottom'
      });


    }
    
    return bool;
 
 }

}
