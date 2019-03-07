import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Pedidos } from '../../interfaces/pedido.interface';
import { Clientes } from '../../interfaces/cliente.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { DatePipe } from '@angular/common';
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

  private clientesCollection2:AngularFirestoreCollection<Clientes>;
  private clientes2: Observable<Clientes[]>;

  private pedidoCollection : AngularFirestoreCollection<Pedidos>;

  //Recebe a data atual para registrá-la
  private dataAtual = new Date()
  private data:string
  private repeat = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder,  
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private authProvider:AuthProvider,
    private datePipe: DatePipe,
    private pmt: ParametrosDetalhesProvider) {

      //Converte a data para o formato ideal
      this.data = this.datePipe.transform(this.dataAtual, 'dd-MM-yyyy');

      //Recebe o id e a role do usuário
      let a = this.authProvider.atualUsuario.role;
      let b = this.authProvider.atualUsuario.id;

      if( a === 'Vendedor') {
        //Se a role for vendedor, ele mostra apenas os clientes relacionados à ele
      this.clientesCollection = this.db.collection('clientes', ref => {
        return ref.where('VENDEDORid', '==', b);
      });      
      this.clientes = this.clientesCollection.valueChanges();

    } else if (a === 'Admin') {
      //Mostra todos os clientes
      this.clientesCollection = this.db.collection<Clientes>('clientes'); 
      this.clientes = this.clientesCollection.valueChanges();

    }

    this.pedidoCollection = this.db.collection('pedidos');

    this.formRegistro = this.fb.group({
      cliente: ['', Validators.compose([Validators.required])],
      bairro: ['', Validators.compose([Validators.required])],
      inscricaoEstadual: ['', Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required])],
      endereco: ['', Validators.compose([Validators.required])],
      razaoSocial: ['', Validators.compose([Validators.required])],
      cidade: ['', Validators.compose([Validators.required])],
      CEP: ['', Validators.compose([Validators.required])],
      estado: ['', Validators.compose([Validators.required])],
      CNPJ: ['', Validators.compose([Validators.required])],
      nomeFantasia: ['', Validators.compose([Validators.required])],
      
    });
    

  }

  isReadonly() {
    return this.isReadonly;
  }

  registro() {

    this.navCtrl.setRoot('RegistroProdutoPedidoPage')

    this.formRegistro.reset()
    let id = this.db.createId()
    this.pmt.setPedido(id)
    this.pmt.setValorPedido(0)
    let a = this.pmt.getCliente()
    console.log(a)
    //Zera o valor total do pedido toda vez que um pedido é gerado
    this.pedidoCollection.doc(id).set({a}).then(result => {
    
      if(this.authProvider.atualUsuario.role === 'Vendedor') {
        //Se o usuário for um vendedor, define o 'vendedor' como o ID do usuario atual
        this.db.doc('pedidos/'+id).update({vendedor:this.authProvider.atualUsuario.id});
      }

      this.db.doc('pedidos/'+id).update({id:id});
      this.db.doc('pedidos/'+id).update({status:'Em andamento'});
      this.db.doc('pedidos/'+id).update({dataEmissao: this.data});
      this.db.doc('pedidos/'+id).update({dataAvaliacao:''});
      this.db.doc('pedidos/'+id).update({dataFinalizada:''});
      this.db.doc('pedidos/'+id).update({statusVenda: 'Não finalizada'});
      this.db.doc('pedidos/'+id).update({valorTotal: 0});

      //Define o pedido e envia para o provider


    }).catch(err => {

      let toast = this.toastCtrl.create({
        message: 'O cadastro falhou, erro: '+err,
        duration: 4000,
        position: 'bottom'
      });
      
      toast.present();
      
    });
  }

  getClienteTemplate(data:any) {
    if(this.repeat===false) {
      this.pmt.setCliente(data)
      this.repeat = true
    }
  }
  
  voltar() {

    this.navCtrl.setRoot('MenuPage')

  }

  escolheCliente(idCliente: any) {
    this.clientesCollection2 = this.db.collection<Clientes>('clientes', ref => {
      return ref.where('id', '==', idCliente);
    });      
    this.clientes2 = this.clientesCollection2.valueChanges();
  }
}
