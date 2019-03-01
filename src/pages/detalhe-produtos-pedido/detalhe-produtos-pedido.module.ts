import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheProdutosPedidoPage } from './detalhe-produtos-pedido';

@NgModule({
  declarations: [
    DetalheProdutosPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheProdutosPedidoPage),
  ],
})
export class DetalheProdutosPedidoPageModule {}
