import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroPedidoPage } from './registro-pedido';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    RegistroPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroPedidoPage),
    NgxErrorsModule
  ],
})
export class RegistroPedidoPageModule {}
