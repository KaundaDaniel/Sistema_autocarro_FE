import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/providers/config.service';
import { ClientesService } from '../../clientes/clientes.service';
import { ConfiguracaoService } from '../../configuracao/configuracao.service';
import { ProdutoService } from '../produto.service';
import { ProdutosComponent } from '../produtos.component';

@Component({
  selector: 'createOrEditProduto',
  templateUrl: './create-or-edit-produto.component.html',
  styleUrls: ['./create-or-edit-produto.component.css']
})
export class CreateOrEditProdutoComponent implements OnInit {

  @Input() modal: any = "createOrEditProdutoModal";
  @Input() title: string = "Registar Produto";
  @Input() product: any;
  @Input() productForm: FormGroup;

  submitted = false;
  public loading = false;
  public categories: any = []
  public product_types: any = []
  public taxes: any = []
  public partners: any = []

  public filters = {
    search: null,
    start_date: null,
    end_date: null,
    customer_via: null,
    status: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  view_list: boolean = false;


  constructor(
    private fb: FormBuilder,
    public sanitizer: DomSanitizer,
    private configService: ConfigService,
    public produtoService: ProdutoService,
    private configuracaoService: ConfiguracaoService,
    private clientesService: ClientesService,
    private listOfProductComp: ProdutosComponent
  ) {

    this.productForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      value: [null, Validators.required],
      quantity: [null, Validators.required],
      image: [null],
      product_type_id: [null, Validators.required],
      search: [null],
      partner_id: [null],
      tax_id: [null, Validators.required],
      product_categorie_id: [null, Validators.required],
      is_active: [1, Validators.required]
    });

    this.selectBoxProductCategories()
    this.selectBoxgetProductTypes()
    this.selectBoxgetProductTaxes()
    this.listOfPartners()
  }

  ngOnInit(): void { }

  // convenience getter for easy access to form fields
  get f() {
    return this.productForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

  public listOfPartners() {

    this.filters.search = this.productForm.getRawValue().search

    this.view_list = this.filters.search ? true : false;

    this.loading = true
    this.clientesService.listOfPartners(this.filters)
      .subscribe(res => {

        this.partners = res

        this.loading = false;
      })
  }

  handPartner(partner: any) {

    this.productForm.patchValue({ search: partner.name || '', partner_id: partner.id })

    this.view_list = false;
  }

  selectBoxProductCategories() {
    this.configuracaoService
      .selectBoxProductCategories()
      .subscribe(response => {
        this.categories = response
      })
  }

  selectBoxgetProductTypes() {
    this.configuracaoService
      .selectBoxgetProductTypes()
      .subscribe(response => {
        this.product_types = response
      })
  }

  selectBoxgetProductTaxes() {
    this.configuracaoService
      .selectBoxgetProductTaxes()
      .subscribe(response => {
        this.taxes = response
      })
  }

  image_preview: any;
  previewImage(fileName: any) {
    return this.produtoService.previewImage(fileName)
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.product !== undefined) {
      this.title = "Editar Produto";
      this.image_preview = this.previewImage(this.product.image)
      this.productForm.patchValue(this.product);
    } else {
      this.title = "Registar Produto";
    }
  }

  createOrEdit() {

    this.submitted = true
    if (this.productForm.invalid) {
      return
    }

    this.loading = true;

    this.produtoService
      .createOrEdit(this.productForm)
      .subscribe(response => {
        this.submitted = false
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
          this.resetForm()
        } else {
          this.configService.toastrError(Object(response).message)
        }
        this.loading = false;
        this.listOfProductComp.listOfProduts()
      })
  }

  resetForm() {
    this.productForm.reset()
    this.image_preview = null
  }

  private images: any = []
  uploadFile(event: any) {

    this.images = []
    const file = event.target.files[0];

    var reader = new FileReader()

    reader.onload = (event: any) => {
      this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result))
      this.productForm.patchValue({ image: file });
    }

    reader.readAsDataURL(event.target.files[0])
  }

}
