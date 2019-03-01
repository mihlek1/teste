import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroClientePage } from './registro-cliente';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    RegistroClientePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroClientePage),
    NgxErrorsModule
  ],
})
export class RegistroClientePageModule {}
