import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLogged = false;
  private currentUserValue: any;

  constructor(
    private router: Router,
    private _http_client: HttpClient,
    private httpService: HttpService
  ) {}

  signIn(user: any) {
    return this._http_client.post<any>(
      `${this.httpService.base_url}/auth/login`,
      user
    );
  }

  canActivateRouterLink(permission: string): boolean {
    const currentUser = this.current_user();
    if (currentUser?.permissions?.includes(permission)) {
      return true;
    } else {
      return false;
    }
  }

  public current_user(): any {
    const data = sessionStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  removeTokenOfUser() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('sessionToken');
    this.userLogged = false;
    this.router.navigateByUrl('/');
  }

  /** ✅ Usa isto em cada request para garantir que o token está actualizado */
  public getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('sessionToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
