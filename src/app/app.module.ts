import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FilterViewPage} from './views/filter-view/filter-view.page';
import {FilterViewPageModule} from './views/filter-view/filter-view.module';
import {RateViewPage} from './views/rate-view/rate-view.page';
import {RateViewPageModule} from './views/rate-view/rate-view.module';
import {environment} from './models/environments';
import {StorageService} from './services/storage.service';
import {Plugins} from '@capacitor/core';
const { Storage } = Plugins;
import {JwtInterceptors} from './services/interceptors/jwt.interceptors';

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    allowedDomains: [environment.api_url]
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [FilterViewPage, RateViewPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FilterViewPageModule,
    RateViewPageModule,
    // JwtModule.forRoot({
    //   jwtOptionsProvider: {
    //     provide: JWT_OPTIONS,
    //     useFactory: jwtOptionsFactory,
    //     deps: [Storage]
    //   }
    // })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptors,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
