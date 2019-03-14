import { Component, Input } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular'
import { AuthProvider } from '../../providers/auth/auth'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore'
import { MenuPage } from '../menu/menu'
import { Clientes } from '../../interfaces/cliente.interface'
import {  ViewChild, ElementRef } from '@angular/core'
// import { Keyboard } from 'ionic-native'

@IonicPage()
@Component({
  selector: 'page-registro-cliente',
  templateUrl: 'registro-cliente.html',
})
export class RegistroClientePage {

  private formRegistro: FormGroup 

  @ViewChild('razaoSocial') razaoSocial;

  private clienteCollection : AngularFirestoreCollection<Clientes>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    fb: FormBuilder,
    private db: AngularFirestore,
    private toastCtrl: ToastController
  ) {

      this.clienteCollection = this.db.collection('clientes');

      this.formRegistro = fb.group({
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


  ionViewDidLoad() {

    setTimeout(() => {
      // Keyboard.show() // for android
      this.razaoSocial.setFocus();
    },150);

 }

  registro() {

    let roleUsuarioAtual = this.authProvider.atualUsuario.role

    let vendedor = this.authProvider.atualUsuario
    
    let dadosFormulario = this.formRegistro.value

    this.formRegistro.reset()
  
    this.navCtrl.setRoot(MenuPage)

    this.clienteCollection.add(dadosFormulario).then(result => {

      if(roleUsuarioAtual === 'Vendedor') {

        this.db.doc('clientes/'+result.id).update({id:result.id});
        this.db.doc('clientes/'+result.id).update({vendedor});
        this.db.doc('clientes/'+result.id).update({verificado:false});
          
      }

      let toast = this.toastCtrl.create({
        message: 'Cliente cadastrado com sucesso',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();

  
    }).catch(err => {
      let toast = this.toastCtrl.create({
        message: 'O cadastro falhou, erro: '+err,
        duration: 4000,
        position: 'bottom'
      });
      
      toast.present();
      
    });

  }
  
  ionViewCanEnter() {

  }

}
