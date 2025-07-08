import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.component.html',
  styleUrls: ['./formas-pagamento.component.css'],
})
export class FormasPagamentoComponent implements OnInit {
  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0,
    },
  };

  public loading = false;

  public payment_method: any;
  public payment_methods: any = [];
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listaOfPaymentMethod();
  }

  ngOnInit(): void {}

  listaOfPaymentMethod() {
    this.loading = true;
    this.http
      .get(`${this.httpService.base_url}/payment_methods/listagem`, {
        headers: this.authService.getHeaders(),
      })
      .subscribe((res) => {
        this.payment_methods = Object(res);
        this.loading = false;
      });
  }

  setCategoria(item: any) {
    this.payment_method = item;
  }

  getPageFilterData(event: any) {}
}
