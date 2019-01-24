import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from 'app/shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isLoggedIn()) {
      // Usuário logado, então retornamos true
      return true;
    }

    // Não está logado, então redirecionamos-o para a tela de home
    this.router.navigateByUrl('/pages/login');

    return false;
  }
}
