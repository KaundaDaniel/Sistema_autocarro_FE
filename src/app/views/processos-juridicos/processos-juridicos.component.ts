import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigService } from 'src/app/providers/config.service';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { ProcessosService } from './processos.service';

@Component({
  selector: 'app-processos-juridicos',
  templateUrl: './processos-juridicos.component.html',
  styleUrls: ['./processos-juridicos.component.css']
})
export class ProcessosJuridicosComponent implements OnInit {

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
  public processo: any
  public products: any = []
  public loading = false;

  first_date_of_year: any
  dataAtual: any

  private searchProducts = new Subject<string>();

  constructor(
    public configService: ConfigService,
    public processosService: ProcessosService,
    public translate: TranslateService,
  ) {
    this.listOfProcessos();

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
        this.listOfProcessos();
      });
  }

  onSearch() {
    this.searchProducts.next();
  }


  public listOfProcessos() {
    this.loading = true
    this.processosService.listOfProcessos(this.filters)
      .subscribe(res => {
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.products = Object(res).data
        this.loading = false
      })
  }


  setProduct(item: any) {
    this.processo = item;
  }


  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.listOfProcessos()
  }

  exportExcel() {
    this.processosService.exportExcel(this.products, 'Listagem de Produtos')
  }


}
