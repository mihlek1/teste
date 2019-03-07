import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Pedidos } from '../../interfaces/pedido.interface';

import { AuthProvider } from '../../providers/auth/auth';
import { ParametrosDetalhesProvider } from '../../providers/parametros-detalhes/parametros-detalhes';


@IonicPage()
@Component({
  selector: 'page-listagem-pedido',
  templateUrl: 'listagem-pedido.html',
})
export class ListagemPedidoPage {

  private pedidosCollection : AngularFirestoreCollection<Pedidos>;
  private pedidos$: Observable<Pedidos[]>;

  constructor(   
    private db:AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private auth: AuthProvider,
    private pmt: ParametrosDetalhesProvider
    
  ) {

    //Mostrar apenas pedidos 'não finalizados'
      this.pedidosCollection = this.db.collection<Pedidos>('pedidos', ref => {
        return ref.where('statusVenda','==', 'Não finalizada').where('vendedor', '==', this.auth.atualUsuario.id);
      });
      this.pedidos$ = this.pedidosCollection.valueChanges();
  
  }
}
