import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfigService } from 'src/app/providers/config.service';
import { ClientesService } from '../../clientes/clientes.service';
import { ProdutoService } from '../../produtos/produto.service';

@Component({
  selector: 'app-products-of-partners',
  templateUrl: './products-of-partners.component.html',
  styleUrls: ['./products-of-partners.component.css']
})
export class ProductsOfPartnersComponent implements OnInit {

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

  view_list: boolean = false;
  partners: any = []

  private searchProducts = new Subject<string>();

  constructor(
    public configService: ConfigService,
    public produtoService: ProdutoService,
    public translate: TranslateService,
    private clientesService: ClientesService
  ) {

    this.listOfProductsPartners();
    this.getFirstDateOfYear();
    this.getDataAtual();
    this.listOfPartners()
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
        this.listOfPartners();
      });
  }

  onSearch() {
    this.searchProducts.next();
  }

  public listOfProductsPartners() {
    this.loading = true
    this.produtoService.listOfProductsPartners(this.filters)
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

  resetPartner(){
    this.filters.partner_id=null
  }

  public listOfPartners() {

    this.view_list = this.filters.search ? true : false;

    this.loading = true
    this.clientesService.listOfPartners(this.filters)
      .subscribe(res => {

        this.partners = res

        this.loading = false;
      })
  }

  handPartner(partner: any) {

    this.filters.search = partner.name
    this.filters.partner_id = partner.id

    this.view_list = false;
  }

  previewImage(fileName: any) {
    return this.produtoService.previewImage(fileName)
  }

  setProduct(item: any) {
    this.product = item;
  }

  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.listOfProductsPartners()
  }

  exportExcel() {
    this.produtoService.exportExcel(this.products, 'Listagem de Produtos de Parceiros')
  }

}
