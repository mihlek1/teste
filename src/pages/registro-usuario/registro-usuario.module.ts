import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroUsuarioPage } from './registro-usuario';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

@NgModule({
  declarations: [
    RegistroUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroUsuarioPage),
    NgxErrorsModule
  ],
})
export class RegistroUsuarioPageModule {}
