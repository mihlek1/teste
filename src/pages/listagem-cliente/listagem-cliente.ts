import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Clientes } from '../../interfaces/cliente.interface';
import { ParametrosDetalhesProvider } from '../../providers/parametros-detalhes/parametros-detalhes';
import { ListagemClienteDetalhesPage } from '../listagem-cliente-detalhes/listagem-cliente-detalhes';

@IonicPage()
@Component({
  selector: 'page-listagem-cliente',
  templateUrl: 'listagem-cliente.html',
})
export class ListagemClientePage {

  private clientesCollection: AngularFirestoreCollection<Clientes>;
  private clientes: Observable<Clientes[]>;
  private vendedor;

  constructor(   
    private db:AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder,
    private authProvider: AuthProvider,
    private pmt: ParametrosDetalhesProvider) {

      let a = this.authProvider.atualUsuario.role;
      let b = this.authProvider.atualUsuario.id;

      if( a === 'Vendedor') {

        this.vendedor = this.authProvider.atualUsuario.nome;
        this.clientesCollection = this.db.collection<Clientes>('clientes', ref => {
          return ref.where('vendedor', '==', b);
        });      
        this.clientes = this.clientesCollection.valueChanges();

      } else if (a === 'Admin' || a === 'Faturamento') {

        this.clientesCollection = this.db.collection<Clientes>('clientes'); 
        this.clientes = this.clientesCollection.valueChanges();

      }

  }

  detalhes(cliente) {
    this.pmt.setClienteData(cliente);
    this.navCtrl.setRoot(ListagemClienteDetalhesPage);
  }

}
