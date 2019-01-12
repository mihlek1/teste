import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalancaRegistroPage } from './balanca-registro';

@NgModule({
  declarations: [
    BalancaRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(BalancaRegistroPage),
  ],
})
export class BalancaRegistroPageModule {}
