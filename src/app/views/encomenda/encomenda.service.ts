import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class EncomendaService {

  public image_safe: SafeResourceUrl = ''

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
    public sanitizer: DomSanitizer
  ) { }

  finishOrder(payload_order: any) {
    return this.http.post(`${this.httpService.base_url}/orders/finish`, payload_order, { headers: this.authService.headers })
  }

  listOfOrders(filters: any) {
    return this.http.get(`${this.httpService.base_url}/orders/listagem?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&status_id=${filters.status_id}&payment_method_id=${filters.payment_method_id}&start_date=${filters.start_date}&end_date=${filters.end_date}&is_pago=${filters.is_pago}`, { headers: this.authService.headers })
  }


  reportingOfOrders(filters: any) {
    return this.http.get(`${this.httpService.base_url}/orders/reporting_por_operador?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&status_id=${filters.status_id}&payment_method_id=${filters.payment_method_id}&start_date=${filters.start_date}&end_date=${filters.end_date}&is_pago=${filters.is_pago}&operador_id=${filters.operador_id}`, { headers: this.authService.headers })
  }


  selectBoxPayment() {
    return this.http.get(`${this.httpService.base_url}/payment_methods/listagem`, { headers: this.authService.headers })
  }

  selectBoxOrderStatus(order_id: any) {
    return this.http.get(`${this.httpService.base_url}/orders/status?order_id=${order_id}`, { headers: this.authService.headers })
  }

  sendReceiptByEmail(order: any) {
    return this.http.post(`${this.httpService.base_url}/orders/send_receipt_email`, { data: order }, { headers: this.authService.headers })
  }

  public aproveOrder(aproveOrderForm: any) {

    const url = `${this.httpService.base_url}/orders/validate`

    return this.http.post(url, aproveOrderForm.value, { headers: this.authService.headers })
  }

  public updateDeliveryAddress(aproveOrderForm: any) {

    const url = `${this.httpService.base_url}/orders/update-delivery-address`

    return this.http.post(url, aproveOrderForm.value, { headers: this.authService.headers })
  }

  getOrderHistoric(order_id: any) {
    return this.http.get(`${this.httpService.base_url}/orders/historics/` + order_id, { headers: this.authService.headers })
  }

  image: any

  previewImage(fileName: any) {
    this.image = `${this.httpService.base_url}/orders/tmp/proofPayment/${fileName}`;
    return this.image_safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.image);
  }

  exportToExcel(orders: any[], filename: string): void {
    const data = orders.map(({ id, customer, total, quantity_products, delivery_address, payment_method, status_description, created_at }: any) =>
      [id, customer, total, quantity_products, delivery_address, payment_method, status_description, created_at]
    );

    const header = ['ID', 'Cliente', 'Total', 'Quantidade de Produtos', 'Local de Entrega', 'Método de Pagamento', 'Estado', 'Data de Criação'];

    const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
    XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });

    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const excelFileURL = URL.createObjectURL(excelData);
    const link = document.createElement('a');
    link.href = excelFileURL;
    link.download = filename + '.xlsx';
    link.click();
    URL.revokeObjectURL(excelFileURL);
  }



}
