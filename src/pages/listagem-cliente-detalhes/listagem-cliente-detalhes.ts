import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MenuPage } from '../menu/menu';
import { Clientes } from '../../interfaces/cliente.interface';
import { ParametrosDetalhesProvider } from '../../providers/parametros-detalhes/parametros-detalhes';
import { ListagemClientePage } from '../listagem-cliente/listagem-cliente';

@IonicPage()
@Component({
  selector: 'page-listagem-cliente-detalhes',
  templateUrl: 'listagem-cliente-detalhes.html',
})
export class ListagemClienteDetalhesPage {

  private formAtualizar: FormGroup; 
  private cliente;

  constructor(

    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    fb: FormBuilder,
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private pmf: ParametrosDetalhesProvider) {

      this.cliente = this.pmf.getClienteData();

      this.formAtualizar = fb.group({
        endereco: ['', Validators.compose([Validators.required])],
        bairro: ['', Validators.compose([Validators.required])],
        numeroPropriedade: ['', Validators.compose([Validators.required])],
        estado: ['', Validators.compose([Validators.required])],
        cidade: ['', Validators.compose([Validators.required])],
        nomeFantasia: ['', Validators.compose([Validators.required])],
        telefone: ['', Validators.compose([Validators.required])],
        CEP: ['', Validators.compose([Validators.required])],
        razaoSocial: ['', Validators.compose([Validators.required])],
        CNPJ: ['', Validators.compose([Validators.required])],
        inscricaoEstadual: ['', Validators.compose([Validators.required])],
      });

  }

  voltar() {
    this.navCtrl.setRoot(ListagemClientePage);
  }
  
  atualizar() {
    let data = this.formAtualizar.value;
    this.navCtrl.setRoot(ListagemClientePage);
    this.db.doc('clientes/'+this.cliente.id).update(data);
  }

  deletar() {
    this.navCtrl.setRoot(ListagemClientePage);
    this.db.doc('clientes/'+this.cliente.id).delete();
  }

}
