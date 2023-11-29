import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/providers/config.service';
import { ProdutoService } from '../produto.service';
import { ProdutosComponent } from '../produtos.component';

@Component({
  selector: 'increaseStock',
  templateUrl: './increase-stock.component.html',
  styleUrls: ['./increase-stock.component.css']
})
export class IncreaseStockComponent implements OnInit {


  @Input() modal: any = "increaseStockModal";
  @Input() title: string = "Aumentar Stock";
  @Input() product: any;
  @Input() increaseStockForm: FormGroup;

  submitted = false;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    public produtoService: ProdutoService,
    private listOfProductComp: ProdutosComponent
  ) {

    this.increaseStockForm = this.fb.group({
      id: [null, Validators.required],
      quantity: [null],
    });
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.increaseStockForm.controls;
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.product !== undefined) {
      this.title = "Aumentar Stock";
      this.increaseStockForm.patchValue({ id: this.product.id });
    } else {
      this.title = "Aumentar Stock";
    }
  }

  increaseStock() {

    this.submitted = true
    if (this.increaseStockForm.invalid) {
      return
    }

    this.loading = true;

    this.produtoService
      .increaseStock(this.increaseStockForm)
      .subscribe(response => {
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.resetForm()
        }else{
          this.configService.toastrError(Object(response).message)
        }
        this.loading = false;
        this.listOfProductComp.listOfProduts()
      })
  }

  onReset() {
    this.submitted = false;
    this.increaseStockForm.reset();
  }

  resetForm() {
    this.increaseStockForm.reset()
  }

}
