import {Injectable} from '@angular/core';
import {CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {filter, map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authSrv: AuthenticationService, private router: Router) {
  }

  canLoad(): Observable<boolean> {
    return this.authSrv.authenticationState.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
          if(isAuthenticated){
            return true;
          } else {
            this.router.navigateByUrl("/");
            return false;
          }
      })
    );
  }
}
