import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'creatOrEditProvincia',
  templateUrl: './creat-or-edit-provincias.component.html',
  styleUrls: ['./creat-or-edit-provincias.component.css']
})
export class CreatOrEditProvinciasComponent implements OnInit {

  @Input() modal: any = "creatOrEditProvinciaModal";
  @Input() title: string = "Registar Provincia";
  @Input() provincia: any;

  submitted = false;
  public loading = false;

  @Input() provinciaForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService
  ) {

    this.provinciaForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.provinciaForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.provinciaForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.provincia !== undefined) {
      this.title = "Editar Provincia";
      this.provinciaForm.patchValue(this.provincia);
    } else {
      this.title = "Registar Provincia";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.provinciaForm.invalid) {
      return
    }

    this.loading = true;
    const url = this.provinciaForm.getRawValue().id == null ? `${this.httpService.base_url}/provincias/create` : `${this.httpService.base_url}/provincias/update/` + this.provinciaForm.getRawValue().id

    this.http
      .post(url, this.provinciaForm.value)
      .subscribe(res => {
        this.loading = false;
      })
  }

}
