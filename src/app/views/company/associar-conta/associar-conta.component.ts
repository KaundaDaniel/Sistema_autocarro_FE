import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'AssociarConta',
  templateUrl: './associar-conta.component.html',
  styleUrls: ['./associar-conta.component.css']
})
export class AssociarContaComponent implements OnInit {

  @Input() modal: any = "associarContaModal";
  @Input() title: string = "Associar Coordenada Bancária";
  @Input() company: any;

  submitted = false;
  public loading = false;

  bank_accounts: any = []

  @Input() bankAccountsForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpService: HttpService
  ) {

    this.bankAccountsForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      company_id: [{ value: null }],
      banc: [null, Validators.required],
      slug: [null, Validators.required],
      iban: [null, Validators.required],
    });

    this.getBankAccounts()
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.bankAccountsForm.controls;
  }

  getBankAccounts() {

    this.http.get(`${this.httpService.base_url}/company/bank-accounts`)
      .subscribe(response => {
        this.bank_accounts = response
      })
  }

  onReset() {
    this.submitted = false;
    this.bankAccountsForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.company !== undefined) {
      this.title = "Associar Coordenada Bancária";
      this.bankAccountsForm.patchValue({ company_id: this.company.id });
    } else {
      this.title = "Associar Coordenada Bancária";
    }
  }

  conta: any;
  setConta(item: any) {
    this.title = "Editar Coordenada Bancária";
    this.conta = item
    this.bankAccountsForm.patchValue(item)
  }

  associateAccounts() {

    this.submitted = true
    if (this.bankAccountsForm.invalid) {
      return
    }

    this.loading = true;

    const url = this.bankAccountsForm.getRawValue().id == null ? `${this.httpService.base_url}/company/associate-account` : `${this.httpService.base_url}/company/update/associate-account/` + this.bankAccountsForm.getRawValue().id

    this.http
      .post(url, this.bankAccountsForm.value)
      .subscribe(res => {
        this.getBankAccounts()
        this.loading = false;
      })
  }

}
