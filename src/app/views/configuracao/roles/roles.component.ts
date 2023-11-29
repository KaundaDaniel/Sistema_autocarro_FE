import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public role: any
  public roles: any = []
  public permisions: any = []

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private configService: ConfigService,
    private authService: AuthService
  ) {
    this.listaOfRoles();
  }

  ngOnInit(): void { }

  listaOfRoles() {
    
    this.http.get(`${this.httpService.base_url}/roles/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.roles = Object(res)
      })
  }

  listaOfPermissions() {

    this.http.get(`${this.httpService.base_url}/permissions/of-roles`, { headers: this.authService.headers })
      .subscribe(res => {

        this.permisions = Object(res)
        this.init_permission(this.permisions)
      })
  }


  public _permisions: any = []

  init_permission(permisions: any) {

    let permisions_merge = []
    this._permisions = []

    for (let permision of permisions) {
      var prop = { role_associated: this.role.id }
      permisions_merge.push({ ...permision, ...prop })
    }

    permisions_merge.forEach(permision => {
      this._permisions.push(permision);
    });
  }

  setRole(item: any) {
    this.role = item;
  }

  associarRolePermision(permision: any) {

    this.http.post(`${this.httpService.base_url}/roles/associar/permission`,
      {
        role_id: this.role.id,
        permission_id: permision.id
      }, { headers: this.authService.headers }).subscribe(res => {

        if (Object(res).code == 200) {
          this.configService.toastrSucess(Object(res).message)
        }else{
          this.configService.toastrError(Object(res).message)
        }
      })

  }
}
