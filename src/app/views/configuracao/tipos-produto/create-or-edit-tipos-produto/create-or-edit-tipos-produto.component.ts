import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracaoService } from '../../configuracao.service';
import { TiposProdutoComponent } from '../tipos-produto.component';

@Component({
  selector: 'createOrEditTipoProduto',
  templateUrl: './create-or-edit-tipos-produto.component.html',
  styleUrls: ['./create-or-edit-tipos-produto.component.css']
})
export class CreateOrEditTiposProdutoComponent implements OnInit {

  @Input() modal: any = "creatOrEditTipoProdutoModal";
  @Input() title: string = "Registar Tipo Produto";
  @Input() product_type: any;

  submitted = false;
  public loading = false;

  @Input() productTypesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private configuracaoService: ConfiguracaoService,
    private tiposProdutoComp:TiposProdutoComponent
  ) {

    this.productTypesForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      slug: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.productTypesForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.productTypesForm.reset();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.product_type !== undefined) {
      this.title = "Editar Tipo Produto";
      this.productTypesForm.patchValue(this.product_type);
    } else {
      this.title = "Registar Tipo Produto";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.productTypesForm.invalid) {
      return
    }

    this.loading = true;
    this.configuracaoService
      .createOrEditTypesProduct(this.productTypesForm)
      .subscribe(res => {
        this.loading = false;
        this.tiposProdutoComp.listOfTypesProducts()
      })
  }

}
