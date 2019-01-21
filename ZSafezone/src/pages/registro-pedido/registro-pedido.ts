import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { EntrarPage } from '../entrar/entrar';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MenuPage } from '../menu/menu';
/**
 * Generated class for the RegistroPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro-pedido',
  templateUrl: 'registro-pedido.html',
})
export class RegistroPedidoPage {

  formRegistro: FormGroup; 
  username:string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    fb: FormBuilder) {
    this.formRegistro = fb.group({
      rSocial: ['', Validators.compose([Validators.required])],
      nFantasia: ['', Validators.compose([Validators.required])],
      endereco: ['', Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required])],
      CEP: ['', Validators.compose([Validators.required])],
      CNPJ: ['', Validators.compose([Validators.required])],
      fPagamento: ['', Validators.compose([Validators.required])],
      cidade: ['', Validators.compose([Validators.required])],
      estado: ['', Validators.compose([Validators.required])],
      iEstadual: ['', Validators.compose([Validators.required])],
    });
  }

  registro() {

  }

}
