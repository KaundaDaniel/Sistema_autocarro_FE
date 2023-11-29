import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) { }

  public listOfCustomers(filters: any) {
    return this.http.get(`${this.httpService.base_url}/customers/listagem?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&customer_via=${filters.customer_via}&status=${filters.status}`, { headers: this.authService.headers })
  }

  public listOfPartners(filters: any) {
    return this.http.get(`${this.httpService.base_url}/customers/partners?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&customer_via=${filters.customer_via}&status=${filters.status}`, { headers: this.authService.headers })
  }

  createOrEdit(customerForm: any) {

    const url = customerForm.getRawValue().id == null ? `${this.httpService.base_url}/customers/create` : `${this.httpService.base_url}/customers/update/` + customerForm.getRawValue().id

    return this.http.post(url, customerForm.value, { headers: this.authService.headers })
  }

  exportExcel(data: any[], filename: string): void {
    const worksheet = XLSX.utils.json_to_sheet(data);
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