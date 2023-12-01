import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Injectable({
  providedIn: 'root'
})
export class AssociarDocumentoService {

  public image_safe: SafeResourceUrl = ''

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private httpService: HttpService,
    public sanitizer: DomSanitizer
  ) { }

  image: any
  previewImage(fileName: any) {

    this.image = `${this.httpService.base_url}/preview/tmp/process_documents/${fileName}`;
    return this.image_safe = this.sanitizer.bypassSecurityTrustResourceUrl(this.image);
  }

  associarDocumento(associarDocumentoForm: any) {

    const url = associarDocumentoForm.getRawValue().id == null ? `${this.httpService.base_url}/process_documents/create` : `${this.httpService.base_url}/process_documents/update/` + associarDocumentoForm.getRawValue().id

    var formData: any = new FormData();
    formData.append("file_name", associarDocumentoForm.get('file_name')?.value);
    formData.append("legal_process_id", associarDocumentoForm.get('legal_process_id')?.value);

    return this.http.post(url, formData, { headers: this.authService.headers })
  }
}
