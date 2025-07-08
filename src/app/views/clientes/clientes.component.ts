import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

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

  customer: any
  customers: any = []
  loading = false;

  first_date_of_year: any
  dataAtual: any

  constructor(
    private clientesService: ClientesService,
    public translate: TranslateService,
  ) {
    this.listOfCustomers();

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



  ngOnInit(): void { }

  public listOfCustomers() {
    this.loading = true
    this.clientesService.listOfCustomers(this.filters)
      .subscribe(res => {
        this.customers = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false
      })
  }

  setCustomer(item: any) {
    this.customer = item;
  }

  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.listOfCustomers()
  }

  exportExcel() {
    this.clientesService.exportExcel(this.customers, 'Listagem de Clientes')
  }


}
