import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MenuPage } from '../menu/menu';
import { Pedido } from '../../interfaces/pedido.interface';
import { Clientes } from '../../interfaces/cliente.interface';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-registro-pedido',
  templateUrl: 'registro-pedido.html',
})
export class RegistroPedidoPage {


  private formRegistro: FormGroup; 

  private clientesCollection: AngularFirestoreCollection<Clientes>;
  private clientes: Observable<Clientes[]>;

  private pedidoCollection : AngularFirestoreCollection<Pedido>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder,  
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private authProvider:AuthProvider) {

      let a = this.authProvider.atualUsuario.role;
      let b = this.authProvider.atualUsuario.id;

      if( a === 'Vendedor') {

      this.clientesCollection = this.db.collection<Clientes>('clientes', ref => {
        return ref.where('vendedor', '==', b);
      });      
      this.clientes = this.clientesCollection.valueChanges();

    } else if (a === 'Admin') {

      this.clientesCollection = this.db.collection<Clientes>('clientes'); 
      this.clientes = this.clientesCollection.valueChanges();

    }

    this.pedidoCollection = this.db.collection('pedidos');

    this.formRegistro = fb.group({
      razaoSocial: ['', Validators.compose([Validators.required])],
      nomeFantasia: ['', Validators.compose([Validators.required])],
      endereco: ['', Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required])],
      CEP: ['', Validators.compose([Validators.required])],
      CNPJ: ['', Validators.compose([Validators.required])],
      formaPagamento: ['', Validators.compose([Validators.required])],
      cidade: ['', Validators.compose([Validators.required])],
      estado: ['', Validators.compose([Validators.required])],
      inscricaoEstadual: ['', Validators.compose([Validators.required])],
      cliente: ['', Validators.compose([Validators.required])],
    });
  }

  registro() {
    let data = this.formRegistro.value;
    this.pedidoCollection.add(data).then(result => {

      this.db.doc('pedidos/'+result.id).update({id:result.id});
      this.db.doc('pedidos/'+result.id).update({vendedor:this.authProvider.atualUsuario.id});
      this.db.doc('pedidos/'+result.id).update({status:'Em andamento'});

      let toast = this.toastCtrl.create({
        message: 'Pedido cadastrado com sucesso',
        duration: 2000,
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
    });
  }

}
