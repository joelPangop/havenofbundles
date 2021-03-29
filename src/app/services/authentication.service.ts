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
import {MailService} from './mail.service';
import {Router} from '@angular/router';
import {Plugins} from '@capacitor/core';

const {Storage, Device} = Plugins;
const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: any;
  authResponse: AuthResponse;
  authenticationState = new BehaviorSubject(false);
  url = environment.api_url;
  confirmation_code: string;
  currentAccessToken: any;
  private isPasswordForgotten: boolean;

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router,
              private platform: Platform, private mailService: MailService, private showAlert: AlertController) {

    this.loadToken();
    this.authResponse = {} as AuthResponse;
    //
  }

  async loadToken() {
    const token = await this.storageService.getObject(TOKEN_KEY);

    if (token) {
      this.currentAccessToken = token.value;
      this.currentUser = await this.storageService.getObject('user');

      this.authenticationState.next(true);
    } else {
      this.authenticationState.next(false);
      this.currentUser = new User();
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
      switchMap(async (tokens: { user, refreshToken, accessToken }) => {
        this.currentAccessToken = tokens.accessToken;
        const decoded = helper.decodeToken(this.currentAccessToken);

        await Storage.set({key: TOKEN_KEY, value: this.currentAccessToken});
        this.currentUser = tokens.user;
        const storeRefresh = await this.storageService.setObject(REFRESH_KEY, tokens.refreshToken);
        const storeAccess = await this.storageService.setString(TOKEN_KEY, this.currentAccessToken);
        this.storeAccessToken(this.currentAccessToken);
        const storeUser = await this.storageService.setObject('user', tokens.user);

        return from(Promise.all([storeRefresh, storeAccess, storeUser]));
      }),
      tap(_ => {
        this.authenticationState.next(true);
        // this.storageService.setObject(TOKEN_KEY, _.access_token);
      })
    );
  }

  logout(load: any) {
    // return this.http.post(`${this.url}/users/auth/logout`, {}).pipe(
    //   switchMap(_ => {
    this.currentUser = undefined;
    this.currentAccessToken = null;
    const deleteAccess = this.storageService.removeItem(TOKEN_KEY);
    const deleteRefresh = this.storageService.removeItem(REFRESH_KEY);
    const deleteUser = this.storageService.removeItem('user');

    load.dismiss();
    this.router.navigateByUrl('/', {replaceUrl: true});
    return from(Promise.all([deleteAccess, deleteRefresh, deleteUser]));
    //   }),
    //   tap(_ => {
    //     this.authenticationState.next(false);
    //     this.currentUser = {};
    //     load.dismiss();
    //     this.router.navigateByUrl('/', {replaceUrl: true});
    //   })
    // ).subscribe();
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/user/user/` + id);
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

  update(user: User): Observable<any> {
    return this.http.put(`${this.url}/user/update/${this.currentUser.id}`, user);
  }

  updatePassword(user: User): Observable<any> {
    return this.http.put(`${this.url}/user/update/password/${this.currentUser.id}`, user);
  }

  updateImage(user: User): Observable<any> {
    return this.http.put(`${this.url}/user/update/image/${this.currentUser.id}`, user);
  }

  verification_user(user: User): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/user/update_verification`, user)
      .pipe(
        tap(async res => {
          console.log('res', res);
        }),
        catchError(e => {
          this.isPasswordForgotten = true;
          throw new Error(e);
        })
      );
  }

  setCurrentUser(user: User) {
    this.currentUser.id = user._id;
    this.currentUser.email = user.email;
    this.currentUser.username = user.username;
  }

}
