import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { PedidosTRD } from './app.component'
import { SplashScreen } from '@ionic-native/splash-screen'

//Módulos automaticamente vão para os imports, entretanto, as vezes precisam ser inicializados
import { AgmCoreModule } from '@agm/core'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrMaskerModule } from 'brmasker-ionic-3'
import { ParametrosDetalhesProvider } from '../providers/parametros-detalhes/parametros-detalhes'

//Importante instalar para erros de formulários
import { NgxErrorsModule } from '@ultimate/ngxerrors'
import { ErrorHandler, NgModule } from '@angular/core'

//Firestore Modules
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'

//Provedores utilizados para receber dados e enviar dados, além de realizar funções como o login
//Tem que ser importados em 'Providers'
import { AuthProvider } from '../providers/auth/auth'
import { DatePipe } from '@angular/common'

//Firebase config
import { environment } from '../environments/firebase.config'

// Páginas criadas(essas páginas devem ser colocadas na 'declarations' e na 'entryComponents')

@NgModule({
  declarations: [
    PedidosTRD
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(PedidosTRD),
    BrowserModule,
		HttpModule,
		AgmCoreModule.forRoot(),
    NgxErrorsModule,
    BrMaskerModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG), //Recebe as credenciais do FB e inicializa
    AngularFirestoreModule.enablePersistence(), //Persistencia offline Firestore
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PedidosTRD
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatePipe,
    ParametrosDetalhesProvider,
  ]
})

export class AppModule {}
