import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { ConfigurationComponent } from '../configuration.component';

@Component({
  selector: 'createOrEditConfiguration',
  templateUrl: './create-or-edit-configuration.component.html',
  styleUrls: ['./create-or-edit-configuration.component.css']
})
export class CreateOrEditConfigurationComponent implements OnInit {


  @Input() modal: any = "creatOrEditConfigurationModal";
  @Input() title: string = "Registar Configuração";
  @Input() configuration: any;

  submitted = false;
  public loading = false;

  @Input() configurationForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private httpService: HttpService,
    private configService: ConfigService,
    private configurationComp: ConfigurationComponent
  ) {

    this.configurationForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      description: [null, Validators.required],
      slug: [null, Validators.required],
      is_active: [null, Validators.required],
      value: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.configurationForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.configurationForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.configuration !== undefined) {
      this.title = "Editar Configuração";
      this.configurationForm.patchValue(this.configuration);
    } else {
      this.title = "Registar Configuração";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.configurationForm.invalid) {
      return
    }

    this.loading = true;
    const url = this.configurationForm.getRawValue().id == null ? `${this.httpService.base_url}/configurations/create` : `${this.httpService.base_url}/configurations/update/` + this.configurationForm.getRawValue().id

    this.http
      .post(url, this.configurationForm.value, { headers: this.authService.headers })
      .subscribe(response => {
        this.loading = false;
        this.configService.toastrSucess(Object(response).message)
        this.configurationComp.listOfConfigurations()
      })
  }


}
