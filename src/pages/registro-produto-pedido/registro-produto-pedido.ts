import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { ParametrosDetalhesProvider } from '../../providers/parametros-detalhes/parametros-detalhes';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Pedidos } from '../../interfaces/pedido.interface';
import { Produtos } from '../../interfaces/produto.interface';
import { ProdutosPedido } from '../../interfaces/produtoPedido.interface';
import { DatePipe } from '@angular/common';
import { DetalheProdutoPage } from '../detalhe-produto/detalhe-produto';
import { MenuPage } from '../menu/menu';
import { DetalheProdutosPedidoPage } from '../detalhe-produtos-pedido/detalhe-produtos-pedido';

@IonicPage()
@Component({
  selector: 'page-registro-produto-pedido',
  templateUrl: 'registro-produto-pedido.html',
})
export class RegistroProdutoPedidoPage {

  private pedidosCollection:AngularFirestoreCollection<Pedidos>;
  private pedidos: Observable<Pedidos[]>;  
           
  private produtosCollection:AngularFirestoreCollection<Produtos>;
  private produtos: Observable<Produtos[]>;
  
  private pedidoProdutoCollection: AngularFirestoreCollection<ProdutosPedido>;

  private produtosCollection2:AngularFirestoreCollection<Produtos>;
  private produtos2: Observable<Produtos[]>;

  private pedido:string;

  private formVenda: FormGroup; 

  private dataAtual = new Date();
  private data:string;

  private nomeProduto:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pmt: ParametrosDetalhesProvider,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private alertCtrl:AlertController,
    private toastCtrl: ToastController,
    private datePipe: DatePipe,
    private modalCtrl: ModalController) {

      this.formVenda = this.fb.group({
        valorUnidade:['', Validators.compose([Validators.required])],
        quantidade:['', Validators.compose([Validators.required])],
        produto: ['', Validators.compose([Validators.required])],
      });
      
      this.pedidoProdutoCollection = this.db.collection<ProdutosPedido>('produtosPedidos');

      this.pedido = this.pmt.getPedido();

      this.pedidosCollection = this.db.collection<Pedidos>('pedidos', ref => {
        return ref.where('id', '==', this.pedido);
      });      
      this.pedidos = this.pedidosCollection.valueChanges();
      
      this.produtosCollection = this.db.collection<Produtos>('produtos');      
      this.produtos = this.produtosCollection.valueChanges();

      this.data = this.datePipe.transform(this.dataAtual, 'dd-MM-yyyy');

  }

  adicionarCarrinho(){

    let data = this.formVenda.value;
    let nProd = this.pmt.getProdutoNome();
    let valorTotal = (data.valorUnidade * data.quantidade);

    this.formVenda.reset();

    this.pedidoProdutoCollection.add(data).then(result => {
      
      this.db.doc('produtosPedidos/'+result.id).update({id:result.id});
      this.db.doc('produtosPedidos/'+result.id).update({pedido:this.pedido});
      this.db.doc('produtosPedidos/'+result.id).update({nome:nProd});
      this.db.doc('produtosPedidos/'+result.id).update({valorTotal:valorTotal});       
      this.pmt.addValorPedido(valorTotal);
      this.db.doc('pedidos/'+this.pedido).update({valorTotal:this.pmt.getValorPedido()});       

      let toast = this.toastCtrl.create({
        message: 'O produto foi adicionado ao carrinho de compras',
        duration: 1000,
        position: 'bottom'
      });
      
      toast.present();
      
    }).catch(err => {

      let toast = this.toastCtrl.create({
        message: 'O produto não foi adicionado, erro: '+err,
        duration: 3000,
        position: 'bottom'
      });
      
      toast.present();
      
    });

  }

  //abre o modal que seta o id do produto e o envia para o provider
  detalhesProduto(produto:string) {
 
    this.pmt.setProduto(produto);

    let profileModal = this.modalCtrl.create(DetalheProdutoPage);
    profileModal.present();

  }

  finalizarPedido() {

    let alert = this.alertCtrl.create({
      title: 'Finalize a Compra',
      message: 'Selecione a forma de pagamento',
      inputs : [
        {
          name:'formaPag',
          type:'radio',
          label:'À vista',
          value:'aVista'
        },
        {
          name:'formaPag',
          type:'radio',
          label:'Boleto',
          value:'boleto'
        }
      ],
      buttons: [
        {
          text:'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.navCtrl.setRoot(MenuPage);

            let toast = this.toastCtrl.create({
              message: 'O pedido foi finalizado com sucesso',
              duration: 1000,
              position: 'bottom'
            }); 
            toast.present();

            this.db.doc('pedidos/'+this.pedido).update({formaPag:data});
            this.db.doc('pedidos/'+this.pedido).update({statusVenda:'Finalizada'});
            this.db.doc('pedidos/'+this.pedido).update({dataFinalizada:this.data});
          }
        }
      ]
    });
    alert.present();

  }

  //abre o modal do carrinho de compras
  mostrarCarrinho() {

    let profileModal = this.modalCtrl.create(DetalheProdutosPedidoPage);
    profileModal.present();

  }
  //define que o campo de valor não será editável, exceto para supervisores
  isReadonly() {
    return this.isReadonly;
  }

  escolheProduto(idProd: any) {
    this.produtosCollection2 = this.db.collection<Produtos>('produtos', ref => {
      return ref.where('nome', '==', idProd);
    });      
    this.produtos2 = this.produtosCollection2.valueChanges();
    this.pmt.setProdutoNome(idProd);
  }

  // cancelarPedido() {

  //   //choicebox sair cancelar ou deletar

  // }

  // deletarPedido() {
  //   //deleta todo produto pedido related
  //   //deleta o pedido
  // }

  voltar() {

    this.navCtrl.setRoot(MenuPage);

    let toast = this.toastCtrl.create({
      message: 'O pedido foi cancelado',
      duration: 1000,
      position: 'bottom'
    });
    
    toast.present();
  }

}
