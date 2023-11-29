import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Injectable({
  providedIn: 'root'
})
export class FacturacaoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
  ) { }

  finishInvoice(payload_invoice: any) {
    return this.http.post(`${this.httpService.base_url}/invoices/finish`, payload_invoice, { headers: this.authService.headers })
  }

  listOfInvoices(filters: any) {
    return this.http.get(`${this.httpService.base_url}/invoices/listagem?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&status_id=${filters.status_id}&payment_method_id=${filters.payment_method_id}&start_date=${filters.start_date}&end_date=${filters.end_date}&is_pago=${filters.is_pago}`, { headers: this.authService.headers })
  }


  reportingOfOrders(filters: any) {
    return this.http.get(`${this.httpService.base_url}/invoices/reporting_por_operador?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&status_id=${filters.status_id}&payment_method_id=${filters.payment_method_id}&start_date=${filters.start_date}&end_date=${filters.end_date}&is_pago=${filters.is_pago}&operador_id=${filters.operador_id}`, { headers: this.authService.headers })
  }

  selectBoxPayment() {
    return this.http.get(`${this.httpService.base_url}/payment_methods/listagem`, { headers: this.authService.headers })
  }


}
