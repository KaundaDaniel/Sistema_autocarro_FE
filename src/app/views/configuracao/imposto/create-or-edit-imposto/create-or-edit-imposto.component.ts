import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracaoService } from '../../configuracao.service';
import { ImpostoComponent } from '../imposto.component';

@Component({
  selector: 'app-create-or-edit-imposto',
  templateUrl: './create-or-edit-imposto.component.html',
  styleUrls: ['./create-or-edit-imposto.component.css']
})
export class CreateOrEditImpostoComponent implements OnInit {

  @Input() modal: any = "createOrEditImpostoModal";
  @Input() title: string = "Registar Imposto";
  @Input() tax: any;

  submitted = false;
  private loading = false;

  @Input() taxForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configuracaoService: ConfiguracaoService,
    private impostoComp: ImpostoComponent
  ) {

    this.taxForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      description: [null, Validators.required],
      code: [null, Validators.required],
      value: [null, Validators.required],
      is_active: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.taxForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.taxForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.tax !== undefined) {
      this.title = "Editar Imposto";
      this.taxForm.patchValue(this.tax);
    } else {
      this.title = "Registar Imposto";
    }
  }

  createOrEditTax() {

    this.submitted = true
    if (this.taxForm.invalid) {
      return
    }

    this.loading = true;

    this.configuracaoService.createOrEditTax(this.taxForm)
      .subscribe(res => {
        this.loading = false;
        this.impostoComp.listaOfTaxes()
      })
  }

}
