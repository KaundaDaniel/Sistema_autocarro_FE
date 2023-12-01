import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {


  public image_safe: SafeResourceUrl = ''

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private httpService: HttpService,
    public sanitizer: DomSanitizer
  ) { }

  image: any

  public listOfProcessos(filters: any) {
    return this.http.get(`${this.httpService.base_url}/processos/listagem?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&start_date=${filters.start_date}&end_date=${filters.end_date}`, { headers: this.authService.headers })
  }

  createOrEdit(productForm: any) {

    const url = productForm.getRawValue().id == null ? `${this.httpService.base_url}/processos/create` : `${this.httpService.base_url}/processos/update/` + productForm.getRawValue().id


    return this.http.post(url, productForm.value, { headers: this.authService.headers })
  }

  getDocumentoProcesso(legal_process_id:any) {

    var url = `${this.httpService.base_url}/processos/documentos`
    return this.http.get(url, { headers: this.authService.headers })
  }

  exportExcel(products: any[], filename: string): void {

    const data = products.map(({ name, value, quantity, categorie, product_type, created_at }: any) => ({ name, value, quantity, categorie, product_type, created_at }));

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
