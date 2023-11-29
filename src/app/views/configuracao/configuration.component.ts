import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  public filters = {
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public loading = false;

  public configuration: any
  public configurations: any = []
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.listOfConfigurations();
  }

  ngOnInit(): void { }

  listOfConfigurations() {
    this.loading = true
    this.http.get(`${this.httpService.base_url}/configurations/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.configurations = Object(res)
        this.loading = false
      })
  }

  setConfiguration(item: any) {
    this.configuration = item;
  }

  getPageFilterData(event: any) {

  }
}
