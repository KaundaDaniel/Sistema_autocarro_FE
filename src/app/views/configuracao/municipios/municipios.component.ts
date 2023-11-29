import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public municipio: any
  public municipios: any = []
  public loading = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listaOfMuicipios();
  }

  ngOnInit(): void { }

  listaOfMuicipios() {
    this.loading = true
    this.http.get(`${this.httpService.base_url}/municipios/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.municipios = Object(res)
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.municipio = item;
  }

  getPageFilterData(event: any) {

  }

}
