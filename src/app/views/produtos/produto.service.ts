import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {


  public image_safe: SafeResourceUrl = ''

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private httpService: HttpService,
    public sanitizer: DomSanitizer
  ) { }

  image: any

  public listOfProduts(filters: any) {
    return this.http.get(`${this.httpService.base_url}/products/listagem?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&start_date=${filters.start_date}&end_date=${filters.end_date}`, { headers: this.authService.headers })
  }

  listOfLowStockProducts(filters: any) {
    return this.http.get(`${this.httpService.base_url}/products/stock-low?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&start_date=${filters.start_date}&end_date=${filters.end_date}`, { headers: this.authService.headers })
  }

  listOfProductsPartners(filters: any) {
    return this.http.get(`${this.httpService.base_url}/products/of-partners?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&start_date=${filters.start_date}&end_date=${filters.end_date}&partner_id=${filters.partner_id}`, { headers: this.authService.headers })
  }

  desactivarProduto(fileName: any, product_id: any) {
    return this.http.patch(`${this.httpService.base_url}/products/delete/${fileName}/${product_id}`, null, { headers: this.authService.headers })
  }

  previewImage(fileName: any) {

    this.image = `${this.httpService.base_url}/product-preview/tmp/products/${fileName}`;
    return this.image_safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.image);
  }

  increaseStock(increaseStockForm: any) {
    return this.http.post(`${this.httpService.base_url}/products/increase-stock/` + increaseStockForm.getRawValue().id, increaseStockForm.value, { headers: this.authService.headers })
  }

  createOrEdit(productForm: any) {

    const url = productForm.getRawValue().id == null ? `${this.httpService.base_url}/products/create` : `${this.httpService.base_url}/products/update/` + productForm.getRawValue().id

    var formData: any = new FormData();
    formData.append("name", productForm.get('name')?.value);
    formData.append("value", productForm.get('value')?.value);
    formData.append("quantity", productForm.get('quantity')?.value);
    formData.append("image", productForm.get('image')?.value);
    formData.append("tax_id", productForm.get('tax_id')?.value);
    formData.append("partner_id", productForm.get('partner_id')?.value);
    formData.append("product_type_id", productForm.get('product_type_id')?.value);
    formData.append("product_categorie_id", productForm.get('product_categorie_id')?.value);

    return this.http.post(url, formData, { headers: this.authService.headers })
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
