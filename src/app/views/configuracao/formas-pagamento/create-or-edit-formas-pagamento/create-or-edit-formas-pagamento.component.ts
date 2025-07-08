import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracaoService } from '../../configuracao.service';

@Component({
  selector: 'createOrEditFormasPagamento',
  templateUrl: './create-or-edit-formas-pagamento.component.html',
  styleUrls: ['./create-or-edit-formas-pagamento.component.css']
})
export class CreateOrEditFormasPagamentoComponent implements OnInit {

  @Input() modal: any = "creatOrEditFormaPagamentoModal";
  @Input() title: string = "Registar Forma Pagamento";
  @Input() payment_method: any;

  submitted = false;
  public loading = false;

  @Input() paymentMethodForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configuracaoService: ConfiguracaoService
  ) {

    this.paymentMethodForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.paymentMethodForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.paymentMethodForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.payment_method !== undefined) {
      this.title = "Editar Forma Pagamento";
      this.paymentMethodForm.patchValue(this.payment_method);
    } else {
      this.title = "Registar Forma Pagamento";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.paymentMethodForm.invalid) {
      return
    }

    this.loading = true;
    this.configuracaoService
      .createOrEditPaymentMethod(this.paymentMethodForm)
      .subscribe(res => {
        this.loading = false;
      })
  }

}
