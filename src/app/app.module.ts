import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FilterViewPage} from './views/filter-view/filter-view.page';
import {FilterViewPageModule} from './views/filter-view/filter-view.module';
import {RateViewPage} from './views/rate-view/rate-view.page';
import {RateViewPageModule} from './views/rate-view/rate-view.module';
import {environment} from './models/environments';
import {Plugins} from '@capacitor/core';
import {JwtInterceptors} from './services/interceptors/jwt.interceptors';
import {FileValidatorDirective} from './services/file-validator.directive';
import {FileValueAccessorDirective} from './services/file-value-accessor.directive';
import {PasswordValidatorDirective} from './services/password-validator.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

const { Storage } = Plugins;

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    allowedDomains: [environment.api_url]
  };
}

@NgModule({
  declarations: [AppComponent, FileValidatorDirective, FileValueAccessorDirective, PasswordValidatorDirective],
  entryComponents: [FilterViewPage, RateViewPage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FilterViewPageModule,
    RateViewPageModule,
    FormsModule,
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
