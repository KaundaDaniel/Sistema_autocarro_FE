import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  company_name: any = 'Adv Control';

  loading: boolean = false;

  dashbaord = {
    total_today: 0.00,
    total_yesterday: 0.00,
    total_month: 0.00,
    total_geral: 0.00,
  }

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService,
    public configService: ConfigService
  ) {
    //this.getDashboard()
  }

  ngOnInit(): void { }

  getDashboard() {
    this.loading = true
    this.http.get(`${this.httpService.base_url}/dashboard/listagem`, { headers: this.authService.headers })
      .subscribe(response => {
        const dash = Object(response)

        this.dashbaord.total_today = dash.total_today
        this.dashbaord.total_yesterday = dash.total_yesterday
        this.dashbaord.total_month = dash.total_month
        this.dashbaord.total_geral = dash.total_geral
        this.loading = false
      })
  }
}
