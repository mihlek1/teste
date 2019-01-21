import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemClientePage } from './listagem-cliente';

@NgModule({
  declarations: [
    ListagemClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemClientePage),
  ],
})
export class ListagemClientePageModule {}
