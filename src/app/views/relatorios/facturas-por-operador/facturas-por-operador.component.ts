import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/providers/config.service';
import { EncomendaService } from '../../encomenda/encomenda.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../configuracao/users/user.service';
import { ReportOrderService } from '../../encomenda/reports/report-order.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-facturas-por-operador',
  templateUrl: './facturas-por-operador.component.html',
  styleUrls: ['./facturas-por-operador.component.css']
})
export class FacturasPorOperadorComponent implements OnInit {

  public filters = {
    search: null,
    status_id: null,
    payment_method_id: null,

    search_operador: null,
    operador_id: null,

    is_pago: null,
    start_date: '',
    end_date: '',
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  orders: any = []
  order_status: any = []
  method_payments: any = []

  image_to_preview: any

  loading = false;
  private searchEncomendas = new Subject<string>();

  first_date_of_year: any
  dataAtual: any

  constructor(
    public configService: ConfigService,
    private encomendaService: EncomendaService,
    public translate: TranslateService,
    public reportOrderService: ReportOrderService,
    private userService: UserService
  ) {
    this.reportingOfOrders();
    this.selectBoxOrderStatus()
    this.selectBoxPayment()

    this.getFirstDateOfYear();
    this.getDataAtual();
  }

  getFirstDateOfYear() {
    this.filters.start_date = this.configService.getFirstDateOfYear()
  }

  getDataAtual() {

    this.filters.end_date = this.configService.getDataAtual()
  }

  ngOnInit(): void {
    this.searchEncomendas
      .pipe(debounceTime(300)) // Defina o tempo de espera desejado (em milissegundos)
      .subscribe(() => {
        this.reportingOfOrders();
      });
  }

  selectBoxOrderStatus() {
    this.encomendaService
      .selectBoxOrderStatus(null)
      .subscribe(response => {
        this.order_status = response
      })
  }

  selectBoxPayment() {
    this.encomendaService
      .selectBoxPayment()
      .subscribe(response => {
        this.method_payments = response
      })
  }

  onSearch() {
    this.searchEncomendas.next();
  }

  reportingOfOrders() {

    this.loading = true

    this.encomendaService
      .reportingOfOrders(this.filters)
      .subscribe(res => {
        this.orders = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false
      })
  }

  order: any
  setOrder(_order: any) {
    this.order = _order
  }

  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.reportingOfOrders()
  }

  previewImage(fileName: any) {
    this.image_to_preview = this.encomendaService.previewImage(fileName)
  }

  exportToExcel() {
    this.encomendaService.exportToExcel(this.orders, 'Listagem de Encomendas')
  }

  view_operador = false;
  operadores: any = []

  searchOperador() {

    this.view_operador = true

    this.filters.search = this.filters.search_operador

    this.userService
      .listaOfUsers(this.filters)
      .subscribe(response => {
        this.operadores = Object(response).data
      })
  }

  setOperador(item: any) {
    this.filters.operador_id = item.id
    this.filters.search_operador = item.name;
    this.view_operador = false
  }

  calcularTotalOrdes(): number {
    let total_without_tax = 0;
    for (const item of this.orders) {
      total_without_tax += item.total_without_tax;
    }
    return total_without_tax;
  }

  resetFilters() {
    this.filters.search = null;
    this.filters.status_id = null;
    this.filters.payment_method_id = null;
    this.filters.search_operador = null;
    this.filters.operador_id = null;
    this.filters.is_pago = null;
    this.filters.start_date = '';
    this.filters.end_date = '';
  }


}
