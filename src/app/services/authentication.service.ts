import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {StorageService} from './storage.service';
import {AlertController, Platform} from '@ionic/angular';
import {environment} from '../models/environments';
import {AuthResponse} from '../models/auth-response';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Utils} from '../Utils';
import {MailService} from './mail.service';
import {Mail} from '../models/mail-interface';
import {Router} from '@angular/router';
import {Plugins} from '@capacitor/core';
const { Storage } = Plugins;
const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: User;
  authResponse: AuthResponse;
  authenticationState = new BehaviorSubject(false);
  url = environment.api_url;
  confirmation_code: string;
  currentAccessToken: any;

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router,
              private platform: Platform, private mailService: MailService, private showAlert: AlertController) {
    this.authResponse = {} as AuthResponse;
    this.loadToken();
  }

  async loadToken() {
    const token = await this.storageService.getObject(TOKEN_KEY);
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.authenticationState.next(true);
    } else {
      this.authenticationState.next(false);
    }
  }

  register(credentials): Observable<AuthResponse> {
    return this.http.post<any>(`${environment.api_url}/user/register`, credentials).pipe(
      tap(async (res) => {

      }),
      catchError(e => {
        // this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  login(credentials: { username, password }): Observable<any> {
    return this.http.post(`${this.url}/user/login`, credentials).pipe(

      switchMap(async (tokens: {user, refreshToken, accessToken }) => {
        this.currentAccessToken = tokens.accessToken;
        const decoded = helper.decodeToken(this.currentAccessToken);

        await Storage.set({key: TOKEN_KEY, value: this.currentAccessToken });
        this.currentUser = tokens.user;
        const storeRefresh = await this.storageService.setObject(REFRESH_KEY, tokens.refreshToken);
        // const storeAccess = await this.storageService.setString(TOKEN_KEY, this.currentAccessToken);
        const storeUser = await this.storageService.setObject('user', tokens.user);

        return from(Promise.all([storeRefresh, storeUser]));
      }),
      tap(_ => {
        this.authenticationState.next(true);
        this.storageService.setObject(TOKEN_KEY, _.access_token);
      })
    );
  }

  logout() {
    return this.http.post(`${this.url}/users/auth/logout`, {}).pipe(
      switchMap(_ => {
        this.currentAccessToken = null;
        const deleteAccess = this.storageService.removeItem(TOKEN_KEY);
        const deleteRefresh = this.storageService.removeItem(REFRESH_KEY);
        return from(Promise.all([deleteAccess, deleteRefresh]));
      }),
      tap(_ => {
        this.authenticationState.next(false);
        this.router.navigateByUrl('/', {replaceUrl: true});
      })
    ).subscribe();
  }

  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    return from(this.storageService.setObject(TOKEN_KEY, accessToken)).pipe();
  }

  getNewAccessToken() {
    const refreshToken = from(this.storageService.getObject(REFRESH_KEY));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'content-type': 'application/json',
              Authorization: `Bearer ${token.value}`
            })
          };
          return this.http.get(`${this.url}/auth/refresh`, httpOptions);
        } else {
          return of(null);
        }
      })
    );
  }
}
