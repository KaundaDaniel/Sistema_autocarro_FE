import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Injectable({
  providedIn: 'root'
})
export class MovimentoProdutoComissaoService {

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private httpService: HttpService
  ) { }


  getMovimentoProdutoComissao(filters: any) {
    return this.http.get(`${this.httpService.base_url}/products/movimento_comissao?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&start_date=${filters.start_date}&end_date=${filters.end_date}&partner_id=${filters.partner_id}`, { headers: this.authService.headers })
  }
}
