import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/providers/config.service';
import { EncomendaService } from './encomenda.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ReportOrderService } from './reports/report-order.service';
import { ConfiguracaoService } from '../configuracao/configuracao.service';

@Component({
  selector: 'app-encomenda',
  templateUrl: './encomenda.component.html',
  styleUrls: ['./encomenda.component.css']
})
export class EncomendaComponent implements OnInit {

  public filters = {
    search: null,
    status_id: null,
    payment_method_id: null,
    is_pago: null,
    start_date: null,
    end_date: null,
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
    private configuracaoService: ConfiguracaoService,
    private encomendaService: EncomendaService,
    public translate: TranslateService,
    public reportOrderService: ReportOrderService
  ) {
    this.listOfOrders();
    this.selectBoxOrderStatus()
    this.selectBoxPayment()

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
    this.searchEncomendas
      .pipe(debounceTime(300)) // Defina o tempo de espera desejado (em milissegundos)
      .subscribe(() => {
        this.listOfOrders();
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

  listOfOrders() {

    this.loading = true

    this.encomendaService
      .listOfOrders(this.filters)
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
    this.listOfOrders()
  }

  previewImage(fileName: any) {
    this.image_to_preview = this.encomendaService.previewImage(fileName)
  }

  exportToExcel() {
    this.encomendaService.exportToExcel(this.orders, 'Listagem de Encomendas')
  }

  printReceiptOrder(order_id: any, via: any) {
    this.reportOrderService.getOrder(order_id, via)
  }

  getOrder(order: any) {

    this.configuracaoService.getOrder(order.id)
      .subscribe(response => {
        console.log(response)
        this.sendReceiptByEmail(response)
      })

  }

  sendReceiptByEmail(order: any) {

    this.encomendaService.sendReceiptByEmail(order)
      .subscribe(response => {
        if (Object(response).code == 200) {
          this.configService.toastrSucess(Object(response).message)
        } else {
          this.configService.toastrError(Object(response).message)
        }
      })
  }

}
