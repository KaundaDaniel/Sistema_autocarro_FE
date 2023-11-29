import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-tipos-produto',
  templateUrl: './tipos-produto.component.html',
  styleUrls: ['./tipos-produto.component.css']
})
export class TiposProdutoComponent implements OnInit {

  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }


  public loading = false;

  public product_type: any
  public product_types: any = []
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listOfTypesProducts();
  }

  ngOnInit(): void { }

  listOfTypesProducts() {
    this.loading = true
    this.http.get(`${this.httpService.base_url}/types-product/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.product_types = Object(res)
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.product_type = item;
  }

  getPageFilterData(event: any) {

  }


}
