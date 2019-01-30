import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ParametrosDetalhesProvider } from '../../providers/parametros-detalhes/parametros-detalhes';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Produtos } from '../../interfaces/produto.interface';

@IonicPage()
@Component({
  selector: 'page-detalhe-produto',
  templateUrl: 'detalhe-produto.html',
})
export class DetalheProdutoPage {

  private produto:string;
  
  private produtoCollection: AngularFirestoreCollection<Produtos>;
  private produtos: Observable<Produtos[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pmt: ParametrosDetalhesProvider,
    public viewCtrl: ViewController,
    private db: AngularFirestore) {

      //Recebe o produto selecionado na combobox
      this.produto = this.pmt.getProduto();
      //Realiza a pesquisa com base no id recebido acima, listando apenas os dados do produto correto
      this.produtoCollection = this.db.collection('produtos', ref => {
        return ref.where('id', '==', this.produto);
      });
      this.produtos = this.produtoCollection.valueChanges();

  }

  fecharModal() {
    this.viewCtrl.dismiss();
  }

}
