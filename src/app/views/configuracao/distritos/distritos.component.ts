import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-distritos',
  templateUrl: './distritos.component.html',
  styleUrls: ['./distritos.component.css']
})
export class DistritosComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public bairro: any
  public municipios: any = []
  public loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listaOfBairros();
  }

  ngOnInit(): void { }

  listaOfBairros() {
    this.loading = true
    this.http.get(`${this.httpService.base_url}/bairros/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.municipios = Object(res)
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.bairro = item;
  }

  getPageFilterData(event: any) {

  }

}
