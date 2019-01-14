import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemUsuarioPage } from './listagem-usuario';

@NgModule({
  declarations: [
    ListagemUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemUsuarioPage),
  ],
})
export class ListagemUsuarioPageModule {}
