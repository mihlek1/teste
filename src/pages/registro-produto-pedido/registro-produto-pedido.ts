import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ParametrosDetalhesProvider } from '../../providers/parametros-detalhes/parametros-detalhes';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Pedidos } from '../../interfaces/pedido.interface';
import { Produtos } from '../../interfaces/produto.interface';
import { ProdutosPedido } from '../../interfaces/produtoPedido.interface';

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

  private pedido;

  private formVenda: FormGroup; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pmt: ParametrosDetalhesProvider,
    private db: AngularFirestore,
    private fb: FormBuilder,
    private alertCtrl:AlertController,
    private toastCtrl: ToastController) {

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

  }

  prodPedido(){


    let data = this.formVenda.value;
    let valorTotal = (data.valorUnidade * data.quantidade);


    let alert = this.alertCtrl.create({			
			message: 'Deseja adicionar esse produto no carrinho de compras?<br/>'+'Preço total: '+valorTotal,
			buttons: [
				{
          text:'Cancelar',
          role: 'cancel'
				},
				{
          text: 'Confirmar',
          handler: () => {
            this.formVenda.reset();

            this.pedidoProdutoCollection.add(data).then(result => {

              this.db.doc('produtosPedidos/'+result.id).update({id:result.id});
              this.db.doc('produtosPedidos/'+result.id).update({pedido:this.pedido});
              this.db.doc('produtosPedidos/'+result.id).update({valorTotal:valorTotal});       

              let toast = this.toastCtrl.create({
                message: 'O produto foi adicionado ao carrinho de compras',
                duration: 1000,
                position: 'bottom'
              });
              
              toast.present();
              
              this.db.doc('pedidos/'+this.pedido).update({statusVenda:'Finalizada'});


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
			]
		});
		alert.present()

  }

  isReadonly() {
    return this.isReadonly;
  }

  setProduto(idProd: any) {
    this.produtosCollection2 = this.db.collection<Produtos>('produtos', ref => {
      return ref.where('id', '==', idProd);
    });      
    this.produtos2 = this.produtosCollection2.valueChanges();
  }


}