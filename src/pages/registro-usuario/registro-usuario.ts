import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MenuPage } from '../menu/menu';



@IonicPage()
@Component({
  selector: 'page-registro-usuario',
  templateUrl: 'registro-usuario.html',
})
export class RegistroUsuarioPage {


  formRegistro: FormGroup; 
  username:string;


  usuarioCollection : AngularFirestoreCollection<any>;
  usuario: Observable<any>;
  usuarioDoc: AngularFirestoreDocument<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertCtrl: AlertController,
    fb: FormBuilder,
    private db: AngularFirestore,
    private toastCtrl: ToastController) {

      this.usuarioCollection = this.db.collection('usuarios');

      this.formRegistro = fb.group({
        nome: ['', Validators.compose([Validators.required])],
        senha: ['', Validators.compose([Validators.required])],
        filial: ['', Validators.compose([Validators.required])],
        role: ['', Validators.compose([Validators.required])]
      });

  }
  registro() {

    let bool =this.authProvider.acessoAdmin();

    if (!bool) {
      this.navCtrl.setRoot(EntrarPage);

      let toast = this.toastCtrl.create({
        message: 'Você não possui acesso à essa funcionalidade',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

    } else {

      let data = this.formRegistro.value;
      this.usuarioCollection.add(data).then(result => {
        console.log(result.id);
  
        this.db.doc('usuarios/'+result.id).update({id:result.id});

        let toast = this.toastCtrl.create({
          message: 'Usuário cadastrado com sucesso',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();

        this.navCtrl.setRoot(MenuPage);
   
      }).catch(err => {

        let toast = this.toastCtrl.create({
          message: 'O cadastro falhou, erro: '+err,
          duration: 3000,
          position: 'bottom'
        });
        
        toast.present();
        
        this.navCtrl.setRoot(MenuPage);
        console.log(err);
      });

    }

  }
  
  ionViewCanEnter() {
    
    let bool =this.authProvider.acessoAdmin();

    if (!bool) {

      this.navCtrl.setRoot(EntrarPage);

      let toast = this.toastCtrl.create({
        message: 'Você não possui acesso à essa página',
        duration: 3000,
        position: 'bottom'
      });


    }       

    return bool;
 
 }

}
