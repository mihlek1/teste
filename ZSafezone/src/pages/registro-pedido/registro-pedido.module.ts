import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPedidoPage } from './registro-pedido';

@NgModule({
  declarations: [
    RegistroPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroPedidoPage),
  ],
})
export class RegistroPedidoPageModule {}
