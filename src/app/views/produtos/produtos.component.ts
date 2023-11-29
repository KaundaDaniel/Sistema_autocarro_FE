import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/providers/config.service';
import { ProdutoService } from './produto.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ClientesService } from '../clientes/clientes.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  public filters = {

    search: null,
    start_date: null,
    end_date: null,
    partner_id: null,

    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public product: any
  public products: any = []
  public loading = false;

  first_date_of_year: any
  dataAtual: any

  private searchProducts = new Subject<string>();

  constructor(
    public configService: ConfigService,
    public produtoService: ProdutoService,
    public translate: TranslateService,
  ) {
    this.listOfProduts();

    this.getFirstDateOfYear();
    this.getDataAtual();
  }

  getFirstDateOfYear() {
    const now = new Date();
    const anoAtual = now.getFullYear();
    this.first_date_of_year = `${anoAtual}-01-01`;
    this.filters.start_date = this.first_date_of_year
  }

  getDataAtual() {
    const now = new Date();
    const anoAtual = now.getFullYear();
    const mesAtual = now.getMonth() + 1;
    const diaAtual = now.getDate();
    this.dataAtual = `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-${diaAtual.toString().padStart(2, '0')}`;
    this.filters.end_date = this.dataAtual
  }

  ngOnInit(): void {
    this.searchProducts
      .pipe(debounceTime(300)) // Defina o tempo de espera desejado (em milissegundos)
      .subscribe(() => {
        this.listOfProduts();
      });
  }

  onSearch() {
    this.searchProducts.next();
  }


  public listOfProduts() {
    this.loading = true
    this.produtoService.listOfProduts(this.filters)
      .subscribe(res => {
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.products = Object(res).data
        this.loading = false
      })
  }

  previewImage(fileName: any) {
    return this.produtoService.previewImage(fileName)
  }

  setProduct(item: any) {
    this.product = item;
  }

  desactivarProduto() {
    this.produtoService.desactivarProduto(this.product.image, this.product.id)
      .subscribe(response => {
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
        } else {
          this.configService.toastrError(Object(response).message)
        }
      })
  }

  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.listOfProduts()
  }

  exportExcel() {
    this.produtoService.exportExcel(this.products, 'Listagem de Produtos')
  }


}
