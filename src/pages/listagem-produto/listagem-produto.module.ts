import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemProdutoPage } from './listagem-produto';

@NgModule({
  declarations: [
    ListagemProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemProdutoPage),
  ],
})
export class ListagemProdutoPageModule {}
