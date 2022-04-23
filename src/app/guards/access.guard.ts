import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateUserAccess(route, state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  // not required
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true;
  }

  validateUserAccess(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.getUser();
    if(!user.isLoggedIn) {
      this.router.navigate(['/account', 'login'], { queryParams: { redirectTo: state.url } } );
      return false;
    }
    if(route.data && route.data['roles'] && (!user.role || route.data['roles'].indexOf(user.role) === -1)) {
      // In such a case, user can be logged out & navigate to home
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
