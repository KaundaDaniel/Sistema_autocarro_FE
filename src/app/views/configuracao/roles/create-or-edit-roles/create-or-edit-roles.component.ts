import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'createOrEditRole',
  templateUrl: './create-or-edit-roles.component.html',
  styleUrls: ['./create-or-edit-roles.component.css']
})
export class CreateOrEditRolesComponent implements OnInit {

  @Input() modal: any = "createOrEditRoleModal";
  @Input() title: string = "Registar Role";
  @Input() role: any;

  submitted = false;
  private loading = false;

  @Input() roleForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService
  ) {

    this.roleForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
      description: [null],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.roleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.roleForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.role !== undefined) {
      this.title = "Editar Role";
      this.roleForm.patchValue(this.role);
    } else {
      this.title = "Registar Role";
    }
  }

  createOrEdit() {
    this.submitted = true
    if (this.roleForm.invalid) {
      return
    }

    this.loading = true;

    const url = this.roleForm.getRawValue().id == null ?
      `${this.httpService.base_url}/roles/create` :
      `${this.httpService.base_url}/roles/update/` + this.roleForm.getRawValue().id

    this.http
      .post(url, this.roleForm.value,{ headers: this.authService.headers })
      .subscribe(res => {
        if (Object(res).code == 200) {
          this.configService.toastrSucess('Role registado com sucesso!')
        }
        this.submitted = false
        this.loading = false;
      })
  }

}
