import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  admin: any = {
    email: null,
    nome: null,
    id: null,
    telefone: null,
    password: null,
  };

  isLoggedIn: boolean = sessionStorage.getItem('sessionToken') ? true : false;

  private userLogged = false;
  loading: boolean = false;

  constructor(
    private _authService: AuthService,
    private configService: ConfigService,
    private router: Router
  ) {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit(): void {}

  _signIn() {
    console.log('Ola Admin', this.admin);

    if (!this.admin.email) {
      this.configService.SwalSuccess('O campo E-mail é obrigatório');
      return;
    }

    if (!this.admin.password) {
      this.configService.SwalSuccess('O campo Senha é obrigatório');
      return;
    }

    this.loading = true;

    this._authService.signIn(this.admin).subscribe(
      (response) => {
        const token = response.token;
        const refreshToken = response.refreshToken;

        // Pega os restantes dados da resposta
        const email = response.email;
        const nome = response.nome;
        const telefone = response.telefone;
        const usuarioId = response.usuarioId;
        const roles = response.roles;

        if (token) {
          const currentUser = {
            token,
            refreshToken,
            email,
            nome,
            telefone,
            usuarioId,
            roles,
          };

          sessionStorage.setItem('sessionToken', token);
          sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

          this.userLogged = true;
          this.loading = false;

          this.configService.toastrSucess('Login efectuado com sucesso');
          this.router.navigateByUrl('/home');
        } else {
          this.configService.toastrError('Resposta inválida do servidor');
          this.loading = false;
        }
      },
      (error) => {
        console.log(error);
        this.userLogged = false;
        this.loading = false;
        this.configService.toastrError(error.message || 'Erro na autenticação');
      }
    );
  }
}
