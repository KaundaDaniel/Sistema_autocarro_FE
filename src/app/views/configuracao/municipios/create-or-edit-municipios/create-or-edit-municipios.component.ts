import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'createOrEditMunicipio',
  templateUrl: './create-or-edit-municipios.component.html',
  styleUrls: ['./create-or-edit-municipios.component.css']
})
export class CreateOrEditMunicipiosComponent implements OnInit {

  @Input() modal: any = "createOrEditMunicipioModal";
  @Input() title: string = "Registar Municipios";
  @Input() municipio: any;
  @Input() municipioForm: FormGroup;

  submitted = false;
  public loading = false;

  public provincias: any = []

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService
  ) {

    this.municipioForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
      provincia_id: [null, Validators.required],
    });

    this.selectBoxProvinica()
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.municipioForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.municipioForm.reset();
  }

  selectBoxProvinica() {
    this.http.get(`${this.httpService.base_url}/provincias/listagem`, { headers: this.authService.headers })
      .subscribe(res => {
        this.provincias = Object(res)
      })
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.municipio !== undefined) {
      this.title = "Editar Municipicio";
      this.municipioForm.patchValue(this.municipio);
    } else {
      this.title = "Registar Municipicio";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.municipioForm.invalid) {
      return
    }

    this.loading = true;
    const url = this.municipioForm.getRawValue().id == null
      ? `${this.httpService.base_url}/municipios/create` :
      `${this.httpService.base_url}/municipios/update/` + this.municipioForm.getRawValue().id

    this.http
      .post(url, this.municipioForm.value, { headers: this.authService.headers })
      .subscribe(res => {
        this.loading = false;
      })
  }

}
