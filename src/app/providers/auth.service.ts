import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userLogged = false
  private currentUserValue: any;


  private token = sessionStorage.getItem('sessionToken')

  public headers = new HttpHeaders()
    //.set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Bearer ${this.token}`)

  constructor(
    private router: Router,
    private _http_client: HttpClient,
    private httpService: HttpService
  ) { }

  signIn(user: any) {
    return this._http_client.post<any>(`${this.httpService.base_url}/autenticacao/sign_in`, user)
  }

  canActivateRouterLink(permission: string): boolean {
    const currentUser = this.current_user();
    if (currentUser.permissions.includes(permission)) {
      return true;
    } else {
      return false;
    }
  }


  public current_user(): any {
    let data: any = sessionStorage.getItem('currentUser')
    let response = JSON.parse(data)
    return response
  }

  removeTokenOfUser() {
    sessionStorage.removeItem('currentUser')
    sessionStorage.removeItem('sessionToken')
    this.userLogged = false
    this.router.navigateByUrl('/')
  }
}
