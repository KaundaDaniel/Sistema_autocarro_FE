import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin: any = {
    username: null,
    password: null
  }

  isLoggedIn: boolean = sessionStorage.getItem('sessionToken') ? true : false

  private userLogged = false
  loading: boolean = false;

  constructor(
    private _authService: AuthService,
    private configService: ConfigService,
    private router: Router
  ) {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/home')
    }
  }

  ngOnInit(): void {
  }

  _signIn() {
    if (this.admin.username == null) {
      this.configService.SwalSuccess("O campo E-mail é obrigatório")
      return
    }

    if (this.admin.password == null) {
      this.configService.SwalSuccess("O campo Senha é obrigatório")
      return
    }

    this.loading = true

    this._authService.signIn(this.admin)
      .subscribe(
        response => {

          let data = response.data

          if (response.code == 200) {

            sessionStorage.setItem('sessionToken', data.token.token)
            sessionStorage.setItem('currentUser', JSON.stringify(data));
            this.userLogged = true
            this.loading = false

            this.configService.toastrSucess(response.message)
            this.router.navigateByUrl('/home')
          } else {
            this.configService.toastrError(response.message)
          }
        },
        (error) => {
          console.log(error)
          if (!error.ok) {
            this.userLogged = false
            this.configService.toastrError(error.message)
            this.router.navigate(['/'])
          }
        }
      )
  }

}
