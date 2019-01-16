import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuContentPage } from './menu-content';

@NgModule({
  declarations: [
    MenuContentPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuContentPage),
  ],
})
export class MenuContentPageModule {}
