import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
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

          this.db.doc('clientes/'+result.id).update({zVENDEDORid:this.authProvider.atualUsuario.id});
          this.db.doc('clientes/'+result.id).update({zVENDEDORnome:this.authProvider.atualUsuario.nome});
          this.db.doc('clientes/'+result.id).update({zVENDEDORestado:this.authProvider.atualUsuario.estado});
          this.db.doc('clientes/'+result.id).update({zVENDEDORcidade:this.authProvider.atualUsuario.cidade});
          this.db.doc('clientes/'+result.id).update({zVENDEDORcpf:this.authProvider.atualUsuario.CPF});
          this.db.doc('clientes/'+result.id).update({zVENDEDORendereco:this.authProvider.atualUsuario.endereco});
          this.db.doc('clientes/'+result.id).update({zVENDEDORbairro:this.authProvider.atualUsuario.bairro});
          this.db.doc('clientes/'+result.id).update({zVENDEDORnumeroCasa:this.authProvider.atualUsuario.numeroCasa});
          this.db.doc('clientes/'+result.id).update({zVENDEDORemail:this.authProvider.atualUsuario.email});
          this.db.doc('clientes/'+result.id).update({zVENDEDORtelefone:this.authProvider.atualUsuario.telefone});
          this.db.doc('clientes/'+result.id).update({zVENDEDORrole:this.authProvider.atualUsuario.role});
          
        } else {

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

  }

}
