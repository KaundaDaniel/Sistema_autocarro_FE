import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css'],
})
export class ProvinciasComponent implements OnInit {
  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0,
    },
  };

  public loading = false;

  public provincia: any;
  public provincias: any = [];
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listOfProvinces();
  }

  ngOnInit(): void {}

  listOfProvinces() {
    this.loading = true;
    this.http
      .get(`${this.httpService.base_url}/provincias/listagem`, {
        headers: this.authService.getHeaders(),
      })
      .subscribe((res) => {
        this.provincias = Object(res);
        this.loading = false;
      });
  }

  setCategoria(item: any) {
    this.provincia = item;
  }

  getPageFilterData(event: any) {}
}
