import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'createOrEditDistrito',
  templateUrl: './create-or-edit-distrito.component.html',
  styleUrls: ['./create-or-edit-distrito.component.css'],
})
export class CreateOrEditDistritoComponent implements OnInit {
  @Input() modal: any = 'createOrEditDistritoModal';
  @Input() title: string = 'Registar Distrito';
  @Input() bairro: any;
  @Input() bairroForm: FormGroup;

  submitted = false;
  public loading = false;

  public municipios: any = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.bairroForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
      municipio_id: [null, Validators.required],
    });

    this.selectBoxMunicipios();
  }

  ngOnInit(): void {}

  // convenience getter for easy access to form fields
  get f() {
    return this.bairroForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.bairroForm.reset();
  }

  selectBoxMunicipios() {
    this.http
      .get(`${this.httpService.base_url}/municipios/listagem`, {
        headers: this.authService.getHeaders(),
      })
      .subscribe((res) => {
        this.municipios = Object(res);
      });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.bairro !== undefined) {
      this.title = 'Editar Distrito';
      this.bairroForm.patchValue(this.bairro);
    } else {
      this.title = 'Registar Distrito';
    }
  }

  createOrEdit() {
    this.submitted = true;
    if (this.bairroForm.invalid) {
      return;
    }

    this.loading = true;
    const url =
      this.bairroForm.getRawValue().id == null
        ? `${this.httpService.base_url}/bairros/create`
        : `${this.httpService.base_url}/bairros/update/` +
          this.bairroForm.getRawValue().id;

    this.http
      .post(url, this.bairroForm.value, {
        headers: this.authService.getHeaders(),
      })
      .subscribe((res) => {
        this.loading = false;
      });
  }
}
