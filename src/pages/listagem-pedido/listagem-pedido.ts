import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Pedidos } from '../../interfaces/pedido.interface';


@IonicPage()
@Component({
  selector: 'page-listagem-pedido',
  templateUrl: 'listagem-pedido.html',
})
export class ListagemPedidoPage {

   private pedidosCollection : AngularFirestoreCollection<Pedidos>;
   private pedidos: Observable<Pedidos[]>;

  constructor(   
    private db:AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams,
    
    ) {

      //Mostrar apenas pedidos 'não finalizados'
       this.pedidosCollection = this.db.collection<Pedidos>('pedidos', ref => {
         return ref.where('statusVenda','==', 'Não finalizada');
       });
       this.pedidos = this.pedidosCollection.valueChanges();
    
    }
}
