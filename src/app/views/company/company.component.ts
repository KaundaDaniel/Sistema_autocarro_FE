import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';
import { ConfiguracaoService } from '../configuracao/configuracao.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input() user: any;
  @Input() companyForm: FormGroup;

  submitted = false;
  public loading = false;

  public my_company: any = []
  company: any

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private configService: ConfigService,
    private httpService: HttpService,
    private authService: AuthService,
    private configuracaoService: ConfiguracaoService
  ) {

    this.companyForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      contributor: [null],
      email: [null],
      commercial_name: [null, Validators.required],
      slogan: [null, Validators.required],
      address: [null, Validators.required],
      website: [null, Validators.required],
      whatsapp_number: [null, Validators.required],
      phone: [null, Validators.required],
    });

    this.getCompany()
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.companyForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.companyForm.reset();
  }

  getCompany() {
    this.configuracaoService.getCompany()
      .subscribe(res => {
      this.my_company = Object(res)
      this.handCompany(this.my_company)
    })
  }

  handCompany(company: any) {
    this.companyForm.patchValue({
      id: company.id,
      name: company.name,
      contributor: company.contributor,
      email: company.email,
      phone: company.phone,
      whatsapp_number: company.whatsapp_number,
      commercial_name: company.commercial_name,
      slogan: company.slogan,
      address: company.address,
      website: company.website,
    })
  }

  setCompany() {
    this.company = this.my_company
  }

  save() {

    this.submitted = true
    if (this.companyForm.invalid) {
      return
    }

    this.loading = true;

    const url = `${this.httpService.base_url}/company/update/` + this.companyForm.getRawValue().id

    this.http.post(url, this.companyForm.value, { headers: this.authService.headers })
      .subscribe(response => {
        this.loading = false;
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.companyForm.reset()
          this.getCompany()
        }
      })
  }

}
