import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from './shared/api.service';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private service: ApiService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
        return this.service.isLoggedIn().pipe(
          map(e => {
            if (e) {
              return true;
            } else {
                return false;
            }
          }),
          catchError((err) => {
            this.router.navigate(['/login']);
            return of(false);
          })
        );
      }   
    
}