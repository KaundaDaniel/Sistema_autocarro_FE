import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { ConfiguracaoService } from 'src/app/views/configuracao/configuracao.service';

@Component({
  selector: 'createOrEditUser',
  templateUrl: './create-or-edit-users.component.html',
  styleUrls: ['./create-or-edit-users.component.css'],
})
export class CreateOrEditUsersComponent implements OnInit {
  @Input() modal: any = 'createOrEditUserModal';
  @Input() title: string = 'Registar Utilizador';
  @Input() user: any;
  @Input() userForm: FormGroup;

  submitted = false;
  public loading = false;

  public roles: any = [];

  public provincias: any = [];
  public municipios: any = [];
  public bairros: any = [];

  laodings = {
    municipio: '',
    bairro: '',
  };

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
    private configuracaoService: ConfiguracaoService
  ) {
    this.userForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      email: [null],
      name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      gender: [null, Validators.required],
      is_active: [1, Validators.required],
      phone: [null, Validators.required],
      provincia_id: [null, Validators.required],
      municipio_id: [null, Validators.required],
      bairro_id: [null, Validators.required],
      role_id: [null],
    });

    this.selectBoxRoles();
    this.listOfProvinces();
  }

  ngOnInit(): void {}

  listOfProvinces() {
    this.loading = true;
    this.configuracaoService.listOfProvinces().subscribe((res) => {
      this.provincias = Object(res);
      this.loading = false;
    });
  }

  handMunicipios(event: any) {
    var id = event.target.value;
    this.getMunicipiosByProvincia(id);
  }

  getMunicipiosByProvincia(id: any) {
    this.laodings.municipio = 'Carregando...';

    this.configuracaoService.getMunicipiosByProvincia(id).subscribe((res) => {
      this.municipios = Object(res);
      this.laodings.municipio = '';
    });
  }

  handBairros(event: any) {
    var id = event.target.value;
    this.getBairrosByMunicipio(id);
  }

  getBairrosByMunicipio(id: any) {
    this.laodings.bairro = 'Carregando...';

    this.configuracaoService.getBairrosByMunicipio(id).subscribe((res) => {
      this.bairros = Object(res);
      this.laodings.bairro = '';
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }

  selectBoxRoles() {
    this.http
      .get(`${this.httpService.base_url}/roles/listagem`, {
        headers: this.authService.getHeaders(),
      })
      .subscribe((res) => {
        this.roles = Object(res);
      });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.user !== undefined) {
      this.title = 'Editar Utilizador';
      this.userForm.patchValue(this.user);
    } else {
      this.title = 'Registar Utilizador';
    }
  }

  createOrEdit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    const url =
      this.userForm.getRawValue().id == null
        ? `${this.httpService.base_url}/autenticacao/register`
        : `${this.httpService.base_url}/users/update/` +
          this.userForm.getRawValue().id;

    this.http
      .post(url, this.userForm.value, {
        headers: this.authService.getHeaders(),
      })
      .subscribe((res) => {
        this.loading = false;
        this.submitted = false;

        if (Object(res).code == 200) {
          this.configService.toastrSucess(Object(res).message);
          this.userForm.reset();
        } else {
          this.configService.toastrError(Object(res).message);
        }
      });
  }
}
