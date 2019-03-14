import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ParametrosDetalhesProvider } from '../../providers/parametros-detalhes/parametros-detalhes';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { ProdutosPedido } from '../../interfaces/produtoPedido.interface';
import * as firebase from 'firebase'
@IonicPage()
@Component({
  selector: 'page-detalhe-produtos-pedido',
  templateUrl: 'detalhe-produtos-pedido.html',
})
export class DetalheProdutosPedidoPage {

  private pProdutos:string;

  private pedidoProdutoCollection: AngularFirestoreCollection<ProdutosPedido>;
  private pedidoProdutos: Observable<ProdutosPedido[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pmt: ParametrosDetalhesProvider,
    private db: AngularFirestore,
    private viewCtrl: ViewController) {

      //Recebe o id do pedido
      this.pProdutos = this.pmt.getPedido();
      //Pesquisa todos os produtos que estão relacionados ao id do pedido
      this.pedidoProdutoCollection = this.db.collection<ProdutosPedido>('produtosPedidos', ref => {
        return ref.where('pedido', '==', this.pProdutos)
      });
      
      this.pedidoProdutos = this.pedidoProdutoCollection.valueChanges();

      // admin.initializeApp();
  }

  fecharModal() {

    this.viewCtrl.dismiss();

  }

  remover(pPedido) {

    //Recebe os dados do produto, diminui o valor total do pedido, deleta o produto e atualiza o valor total.

    let vtotal:number = pPedido.valorTotal;
    this.pmt.removeValorPedido(vtotal);
    this.db.doc('produtosPedidos/'+pPedido.id).delete();
    this.db.doc('pedidos/'+pPedido.pedido).update({valorTotal:this.pmt.getValorPedido()});       

  } 

  removerAll() {

    let valorPedido = this.pmt.getValorPedido();

    firebase.firestore().collection('produtosPedidos').where('pedido', '==', this.pProdutos)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log("Document successfully deleted!");
          if(valorPedido > 0) {  
            let valorPedido = this.pmt.getValorPedido(); 
            this.pmt.setValorPedido(0);
            this.db.doc('pedidos/'+this.pProdutos).update({valorTotal:valorPedido});       
          }
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });



  }
  
}
