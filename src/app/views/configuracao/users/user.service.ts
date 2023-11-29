import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService
  ) { }

  listaOfUsers(filters: any) {
    return this.http.get(`${this.httpService.base_url}/users/listagem?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}`, { headers: this.authService.headers })
  }
}
