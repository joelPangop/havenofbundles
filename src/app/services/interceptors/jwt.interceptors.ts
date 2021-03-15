import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {environment} from '../../models/environments';
import {AuthenticationService} from '../authentication.service';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';

@Injectable()
export class JwtInterceptors implements HttpInterceptor {

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  isRefreshingToken = false;

  constructor(private authService: AuthenticationService, private toastCtrl: ToastController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isInBlockedList(req.url)) {
      return next.handle(req);
    } else {
      return next.handle(this.addToken(req)).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 400:
                return this.handle400Error();
              case 401:
                return this.handle401Error(req, next);
              default:
                return throwError(err);
            }
          } else {
            return throwError(err);
          }
        })
      );
    }
  }

  private isInBlockedList(url: string): Boolean {
    if (url == `${environment.api_url}/sign-in` || url == `${environment.api_url}/mobile-sign-in`) {
      return true;
    } else {
      return false;
    }
  }

  private addToken(req: HttpRequest<any>) {
    if (this.authService.currentAccessToken) {
      return req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.currentAccessToken}`
        })
      });
    } else {
      return req;
    }
  }

  private async handle400Error() {
    const toast = await this.toastCtrl.create({
      message: 'Logged out due to authentication mismatched'
    });

    await toast.present();
    this.authService.logout();
    return of(null);
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshingToken) {
      this.tokenSubject.next(null);
      this.isRefreshingToken = true;
      this.authService.currentAccessToken = null;
      return this.authService.getNewAccessToken().pipe(
        switchMap((token: any) => {
          if (token) {
            const accessToken = token.accessToken;
            return this.authService.storeAccessToken(accessToken).pipe(
              switchMap(_ => {
                this.tokenSubject.next(accessToken);
                return next.handle(this.addToken(req));
              })
            );
          } else {
            return of(null);
          }
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(_ => {
          return next.handle(this.addToken(req));
        })
      );
    }
  }

}
