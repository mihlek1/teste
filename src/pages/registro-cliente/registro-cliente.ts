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
        endereco: ['', Validators.compose([Validators.required])],
        bairro: ['', Validators.compose([Validators.required])],
        numeroPropriedade: ['', Validators.compose([Validators.required])],
        estado: ['', Validators.compose([Validators.required])],
        cidade: ['', Validators.compose([Validators.required])],
        nomeFantasia: ['', Validators.compose([Validators.required])],
        telefone: ['', Validators.compose([Validators.required])],
        CEP: ['', Validators.compose([Validators.required])],
        razaoSocial: ['', Validators.compose([Validators.required])],
        CNPJ: ['', Validators.compose([Validators.required])],
        inscricaoEstadual: ['', Validators.compose([Validators.required])],
      });
    
  }

  registro() {
    this.navCtrl.setRoot(MenuPage);

    let a = this.authProvider.atualUsuario.role;
    

      let data = this.formRegistro.value;

      this.clienteCollection.add(data).then(result => {
  
        this.db.doc('clientes/'+result.id).update({id:result.id});

        if(this.authProvider.atualUsuario.role === 'Vendedor') {
          this.db.doc('clientes/'+result.id).update({vendedor:this.authProvider.atualUsuario.id});
        } else {
          this.db.doc('clientes/'+result.id).update({vendedor:''});
        }

        let toast = this.toastCtrl.create({
          message: 'Cliente cadastrado com sucesso',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();

   
      }).catch(err => {

        let toast = this.toastCtrl.create({
          message: 'O cadastro falhou, erro: '+err,
          duration: 2000,
          position: 'bottom'
        });
        
        toast.present();
        
      });

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
