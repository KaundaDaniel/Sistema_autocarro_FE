import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public image_safe: SafeResourceUrl = ''

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private httpService: HttpService,
    public sanitizer: DomSanitizer
  ) { }

  image: any

  public listaOfNews(filters: any) {
    return this.http.get(`${this.httpService.base_url}/news/listagem?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&start_date=${filters.start_date}&end_date=${filters.end_date}`, { headers: this.authService.headers })
  }

  public listOfNewsFaleConnosco(filters: any) {
    return this.http.get(`${this.httpService.base_url}/news/all_contact?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&start_date=${filters.start_date}&end_date=${filters.end_date}`, { headers: this.authService.headers })
  }

  previewImage(fileName: any) {

    this.image = `${this.httpService.base_url}/news-preview/tmp/news/${fileName}`;
    return this.image_safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.image);
  }

  createOrEdit(newsForm: any) {

    const url = newsForm.getRawValue().id == null ? `${this.httpService.base_url}/news/create` : `${this.httpService.base_url}/news/update/` + newsForm.getRawValue().id

    var formData: any = new FormData();
    formData.append("subject", newsForm.get('subject')?.value);
    formData.append("body", newsForm.get('body')?.value);
    formData.append("is_active", newsForm.get('is_active')?.value);
    formData.append("image", newsForm.get('image')?.value);

    return this.http.post(url, formData, { headers: this.authService.headers })
  }

  exportExcel(news: any[], filename: string): void {

    const data = news //news.map(({ name, value, quantity, categorie, product_type, created_at }: any) => ({ name, value, quantity, categorie, product_type, created_at }));

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
