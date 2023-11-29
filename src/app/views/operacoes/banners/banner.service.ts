import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  public image_safe: SafeResourceUrl = ''

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private httpService: HttpService,
    public sanitizer: DomSanitizer
  ) { }

  image: any

  public listaOfBanners(filters: any) {
    return this.http.get(`${this.httpService.base_url}/banners/listagem?search=${filters.search}&page=${filters.pagination.page}&perPage=${filters.pagination.perPage}&start_date=${filters.start_date}&end_date=${filters.end_date}`, { headers: this.authService.headers })
  }

  previewImage(fileName: any) {

    this.image = `${this.httpService.base_url}/banners/tmp/preview/${fileName}`;
    return this.image_safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.image);
  }

  createOrEdit(bannerForm: any) {

    const url = bannerForm.getRawValue().id == null ? `${this.httpService.base_url}/banners/create` : `${this.httpService.base_url}/banners/update/` + bannerForm.getRawValue().id

    var formData: any = new FormData();
    formData.append("title", bannerForm.get('title')?.value);
    formData.append("sub_title", bannerForm.get('sub_title')?.value);
    formData.append("is_active", bannerForm.get('is_active')?.value);
    formData.append("ordem", bannerForm.get('ordem')?.value);
    formData.append("image", bannerForm.get('image')?.value);

    return this.http.post(url, formData, { headers: this.authService.headers })
  }
}
