import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemClienteDetalhesPage } from './listagem-cliente-detalhes';

@NgModule({
  declarations: [
    ListagemClienteDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemClienteDetalhesPage),
  ],
})
export class ListagemClienteDetalhesPageModule {}
