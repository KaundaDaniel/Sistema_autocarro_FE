import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  listaOfCategorias() {
    return this.http.get(`${this.httpService.base_url}/categories/listagem`, {
      headers: this.authService.getHeaders(),
    });
  }

  createOrEdit(categoriaForm: any) {
    const url =
      categoriaForm.getRawValue().id == null
        ? `${this.httpService.base_url}/categories/create`
        : `${this.httpService.base_url}/categories/update/` +
          categoriaForm.getRawValue().id;

    return this.http.post(url, categoriaForm.value, {
      headers: this.authService.getHeaders(),
    });
  }
}
