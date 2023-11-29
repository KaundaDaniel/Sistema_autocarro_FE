import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfigService } from 'src/app/providers/config.service';
import { ProdutoService } from '../../produtos/produto.service';

@Component({
  selector: 'app-low-stock-products',
  templateUrl: './low-stock-products.component.html',
  styleUrls: ['./low-stock-products.component.css']
})
export class LowStockProductsComponent implements OnInit {

  public filters = {
    search: null,
    start_date: null,
    end_date: null,
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
    this.listOfLowStockProducts();

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
        this.listOfLowStockProducts();
      });
  }

  onSearch() {
    this.searchProducts.next();
  }

  public listOfLowStockProducts() {
    this.loading = true
    this.produtoService.listOfLowStockProducts(this.filters)
      .subscribe(res => {
        
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.products = Object(res).data

        if (Object(res).code == 201) {
          this.configService.toastrError(Object(res).message)
        }

        this.loading = false
      })
  }

  previewImage(fileName: any) {
    return this.produtoService.previewImage(fileName)
  }

  setProduct(item: any) {
    this.product = item;
  }

  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.listOfLowStockProducts()
  }

  exportExcel() {
    this.produtoService.exportExcel(this.products, 'Listagem de Produtos Stock Baixo')
  }


}
