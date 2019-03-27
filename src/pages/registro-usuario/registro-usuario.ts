import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MenuPage } from '../menu/menu';
import { Usuarios } from '../../interfaces/usuario.interface';
import { AngularFireAuth } from 'angularfire2/auth'


@IonicPage()
@Component({
  selector: 'page-registro-usuario',
  templateUrl: 'registro-usuario.html',
})
export class RegistroUsuarioPage {


  private formRegistro: FormGroup; 

  private usuarioCollection : AngularFirestoreCollection<Usuarios>;

  constructor(
    private afAuth: AngularFireAuth,
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
      
      this.navCtrl.setRoot('MenuPage');

      let dadosUsuario = this.formRegistro.value;

      try{  

        let result = this.afAuth.auth.createUserWithEmailAndPassword(dadosUsuario.usuario, dadosUsuario.senha);
        console.log(result)
        let toast = this.toastCtrl.create({
          message: 'Usuário cadastrado com sucesso',
          duration: 2000,
          position: 'bottom'
        });
        
        toast.present();



      } catch (erro) {

        let toast = this.toastCtrl.create({
          message: 'O cadastro falhou, erro: '+erro,
          duration: 4000,
          position: 'bottom'
        });
       
        toast.present();

      }

  }
//       this.usuarioCollection.add(dadosUsuario).then(result => {
  
//         this.db.doc('usuarios/'+result.id).update({id:result.id});

   
//       }).catch(err => {


        
//       });

//     }

  
  
//   ionViewCanEnter() {
 
//  }
  
}
