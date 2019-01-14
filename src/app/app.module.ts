import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Menu } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { EntrarPage } from '../pages/entrar/entrar';
import { MenuPage } from '../pages/menu/menu';
import { RegistroUsuarioPage } from '../pages/registro-usuario/registro-usuario';
import { DatabaseProvider } from '../providers/database/database';
import { environment } from '../environments/firebase.config';
import { RegistroPedidoPage } from '../pages/registro-pedido/registro-pedido';
import { ListagemPedidoPage } from '../pages/listagem-pedido/listagem-pedido';
import { MenuContentPage } from '../pages/menu-content/menu-content';
import { ListagemUsuarioPage } from '../pages/listagem-usuario/listagem-usuario';

@NgModule({
  declarations: [
    MyApp,
    EntrarPage,
    MenuPage,
    RegistroUsuarioPage,
    RegistroPedidoPage,
    ListagemPedidoPage,
    MenuContentPage,
    ListagemUsuarioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserModule,
		HttpModule,
		AgmCoreModule.forRoot(),
		NgxErrorsModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFirestoreModule.enablePersistence()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EntrarPage,
    MenuPage,
    RegistroUsuarioPage,
    RegistroPedidoPage,
    ListagemPedidoPage,
    MenuContentPage,
    ListagemUsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
