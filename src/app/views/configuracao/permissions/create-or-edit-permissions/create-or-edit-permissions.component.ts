import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'createOrEditPermission',
  templateUrl: './create-or-edit-permissions.component.html',
  styleUrls: ['./create-or-edit-permissions.component.css']
})
export class CreateOrEditPermissionsComponent implements OnInit {

  @Input() modal: any = "createOrEditRoleModal";
  @Input() title: string = "Registar Role";
  @Input() permision: any;

  submitted = false;
  private loading = false;

  @Input() permisionForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService
  ) {

    this.permisionForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
      description: [null],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.permisionForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.permisionForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.permision !== undefined) {
      this.title = "Editar Permissão";
      this.permisionForm.patchValue(this.permision);
    } else {
      this.title = "Registar Permissão";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.permisionForm.invalid) {
      return
    }

    this.loading = true;

    const url = this.permisionForm.getRawValue().id == null ?
      `${this.httpService.base_url}/permissions/create` :
      `${this.httpService.base_url}/permissions/update/` + this.permisionForm.getRawValue().id

    this.http
      .post(url, this.permisionForm.value, { headers: this.authService.headers })
      .subscribe(res => {

        if (Object(res).code == 200) {

          this.submitted = false
          this.loading = false;
          
          this.configService.toastrSucess(Object(res).message)
        } else {
          this.configService.toastrError(Object(res).message)
        }
      })
  }

}
