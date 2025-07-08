import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {
  public permision: any;
  public permisions: any = [];

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.listaOfPermissions();
  }

  ngOnInit(): void {}

  listaOfPermissions() {
    this.http
      .get(`${this.httpService.base_url}/permissions/listagem`, {
        headers: this.authService.getHeaders(),
      })
      .subscribe((res) => {
        this.permisions = Object(res);
      });
  }

  setRole(item: any) {
    this.permision = item;
  }
}
