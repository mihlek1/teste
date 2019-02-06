import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroProdutoPedidoPage } from './registro-produto-pedido';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    RegistroProdutoPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroProdutoPedidoPage),
    NgxErrorsModule
  ],
})
export class RegistroProdutoPedidoPageModule {}
