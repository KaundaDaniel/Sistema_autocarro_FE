import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  company_name: any = 'Adv Control';
  loading: boolean = false;

  dashbaord = {
    customer_count: 0,
    legal_processes_count: 0,
    users_count: 0,
  }

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService,
    public configService: ConfigService
  ) {
    this.getDashboard()
  }

  ngOnInit(): void { }

  getDashboard() {
    this.loading = true
    this.http.get(`${this.httpService.base_url}/dashboard/listagem`, { headers: this.authService.headers })
      .subscribe(response => {
        const dash = Object(response)
        this.dashbaord.customer_count = dash.customer_count
        this.dashbaord.legal_processes_count = dash.legal_processes_count
        this.dashbaord.users_count = dash.users_count
        this.loading = false
      })
  }

}
