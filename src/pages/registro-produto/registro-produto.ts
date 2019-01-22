import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { MenuPage } from '../menu/menu';
import { Pedido } from '../../interfaces/pedido.interface';
import { Clientes } from '../../interfaces/cliente.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { Produtos } from '../../interfaces/produto.interface';

@IonicPage()
@Component({
  selector: 'page-registro-produto',
  templateUrl: 'registro-produto.html',
})
export class RegistroProdutoPage {

  private formRegistro: FormGroup; 

  private produtosCollection: AngularFirestoreCollection<Produtos>;
  private produtos: Observable<Produtos[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder,  
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private authProvider:AuthProvider) {
      this.produtosCollection = this.db.collection('produtos');

      this.formRegistro = fb.group({
        nome: ['', Validators.compose([Validators.required])],
        descricao: ['', Validators.compose([Validators.required])],
        unidade: ['', Validators.compose([Validators.required])],
      });
    
  }

  registro() {
    this.navCtrl.setRoot(MenuPage);

    let data = this.formRegistro.value;
    this.produtosCollection.add(data).then(result => {

      this.db.doc('produtos/'+result.id).update({id:result.id});

      let toast = this.toastCtrl.create({
        message: 'Produto cadastrado com sucesso',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();

 
    }).catch(err => {

      let toast = this.toastCtrl.create({
        message: 'O cadastro falhou, erro: '+err,
        duration: 3000,
        position: 'bottom'
      });
      
      toast.present();
      
      this.navCtrl.setRoot(MenuPage);
    });
  }

}
