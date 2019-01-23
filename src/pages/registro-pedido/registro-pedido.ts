import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Pedidos } from '../../interfaces/pedido.interface';
import { Clientes } from '../../interfaces/cliente.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { DatePipe } from '@angular/common';
import { RegistroProdutoPedidoPage } from '../registro-produto-pedido/registro-produto-pedido';
import { ParametrosDetalhesProvider } from '../../providers/parametros-detalhes/parametros-detalhes';

@IonicPage()
@Component({
  selector: 'page-registro-pedido',
  templateUrl: 'registro-pedido.html',
})
export class RegistroPedidoPage {


  private formRegistro: FormGroup; 

  private clientesCollection: AngularFirestoreCollection<Clientes>;
  private clientes: Observable<Clientes[]>;

  private pedidoCollection : AngularFirestoreCollection<Pedidos>;
  private dataAtual = new Date();
  private data:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,  
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private authProvider:AuthProvider,
    private datePipe: DatePipe,
    private pmt: ParametrosDetalhesProvider) {

      this.data = this.datePipe.transform(this.dataAtual, 'dd-MM-yyyy');

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

    this.formRegistro = this.fb.group({
      formaPagamento: ['', Validators.compose([Validators.required])],
      cliente: ['', Validators.compose([Validators.required])],
    });
    

  }
  registro() {
    let data = this.formRegistro.value;
    
    this.pedidoCollection.add(data).then(result => {

      if(this.authProvider.atualUsuario.role === 'Vendedor') {
        this.db.doc('pedidos/'+result.id).update({vendedor:this.authProvider.atualUsuario.id});
      } else {
        this.db.doc('pedidos/'+result.id).update({vendedor:''});
      }

      this.db.doc('pedidos/'+result.id).update({id:result.id});
      this.db.doc('pedidos/'+result.id).update({status:'Em andamento'});
      this.db.doc('pedidos/'+result.id).update({dataEmissao: this.data});
      this.db.doc('pedidos/'+result.id).update({dataAvaliacao: ''});
      this.db.doc('pedidos/'+result.id).update({statusVenda: 'Não finalizada'});
      this.db.doc('pedidos/'+result.id).update({valorTotal: 0});
      this.pmt.setPedido(result.id);
      this.navCtrl.setRoot(RegistroProdutoPedidoPage);

    }).catch(err => {

      let toast = this.toastCtrl.create({
        message: 'O cadastro falhou, erro: '+err,
        duration: 3000,
        position: 'bottom'
      });
      
      toast.present();
      
    });
  }

}
