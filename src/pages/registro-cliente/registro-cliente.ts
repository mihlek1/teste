import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MenuPage } from '../menu/menu';
import { Clientes } from '../../interfaces/cliente.interface';

@IonicPage()
@Component({
  selector: 'page-registro-cliente',
  templateUrl: 'registro-cliente.html',
})
export class RegistroClientePage {


  private formRegistro: FormGroup; 


  private clienteCollection : AngularFirestoreCollection<Clientes>;
  private cliente: Observable<Clientes>;
  private clienteDoc: AngularFirestoreDocument<Clientes>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    fb: FormBuilder,
    private db: AngularFirestore,
    private toastCtrl: ToastController) {

      this.clienteCollection = this.db.collection('clientes');

      this.formRegistro = fb.group({
        nome: ['', Validators.compose([Validators.required])],
        CPF: ['', Validators.compose([Validators.required])],
        RG: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required])],
        endereco: ['', Validators.compose([Validators.required])],
        numeroEndereco: ['', Validators.compose([Validators.required])],
        bairro: ['', Validators.compose([Validators.required])],
        CEP: ['', Validators.compose([Validators.required])],
        cidade: ['', Validators.compose([Validators.required])],
        estado: ['', Validators.compose([Validators.required])],
      });
    
  }

  registro() {

    let a = this.authProvider.atualUsuario.role;
    
    if(!((a === 'Vendedor') || (a === 'Admin'))) {
      this.navCtrl.setRoot(EntrarPage);

      let toast = this.toastCtrl.create({
        message: 'Você não possui acesso à essa funcionalidade',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();

    } else {

      let data = this.formRegistro.value;

      this.clienteCollection.add(data).then(result => {
  
        this.db.doc('clientes/'+result.id).update({id:result.id});

        this.db.doc('clientes/'+result.id).update({vendedor:this.authProvider.atualUsuario.id});

        let toast = this.toastCtrl.create({
          message: 'Cliente cadastrado com sucesso',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();

        this.navCtrl.setRoot(MenuPage);
   
      }).catch(err => {

        let toast = this.toastCtrl.create({
          message: 'O cadastro falhou, erro: '+err,
          duration: 2000,
          position: 'bottom'
        });
        
        toast.present();
        
        this.navCtrl.setRoot(MenuPage);
      });

    }

  }
  ionViewCanEnter() {

    let a = this.authProvider.atualUsuario.role;
    let bool:boolean;
    
    if(a === 'Vendedor' || a === 'Admin') {
      bool = true;
    } else {
      bool = false;
    }

    if (!bool) {
      this.navCtrl.setRoot(EntrarPage);

      let toast = this.toastCtrl.create({
        message: 'Você não possui acesso à essa página',
        duration: 2000,
        position: 'bottom'
      });


    }
    
    return bool;
 
 }

}
