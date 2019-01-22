import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Pedido } from '../../interfaces/pedido.interface';


@IonicPage()
@Component({
  selector: 'page-listagem-pedido',
  templateUrl: 'listagem-pedido.html',
})
export class ListagemPedidoPage {

   private pedidosCollection : AngularFirestoreCollection<Pedido>;
   private pedidos: Observable<Pedido[]>;

  constructor(   
    private db:AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams,
    
    ) {

      // let a = this.db.collection('usuarios').snapshotChanges();

      // a.subscribe(actionArray => {
      //   this.list = actionArray.map(item => {
      //     return { 
      //       id: item.payload.doc.id,
      //       ...item.payload.doc.data()
      //     } as Usuarios;
      //   })
      // });

       this.pedidosCollection = this.db.collection<Pedido>('pedidos');

       this.pedidos = this.pedidosCollection.valueChanges();
    
    }
}
