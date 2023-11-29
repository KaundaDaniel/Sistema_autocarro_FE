import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { HttpService } from 'src/app/providers/http.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  listaOfTaxes() {
    return this.http.get(`${this.httpService.base_url}/configuration/taxes`, { headers: this.authService.headers })
  }

  createOrEditTax(taxForm: any) {

    const url = taxForm.getRawValue().id == null ? `${this.httpService.base_url}/configuration/tax` : `${this.httpService.base_url}/configuration/tax/` + taxForm.getRawValue().id

    return this.http.post(url, taxForm.value, { headers: this.authService.headers })
  }

  createOrEditPaymentMethod(paymentMethodForm: any) {

    const url = paymentMethodForm.getRawValue().id == null ? `${this.httpService.base_url}/payment_methods/create` : `${this.httpService.base_url}/payment_methods/update/` + paymentMethodForm.getRawValue().id

    return this.http.post(url, paymentMethodForm.value, { headers: this.authService.headers })
  }

  createOrEditTypesProduct(paymentMethodForm: any) {

    const url = paymentMethodForm.getRawValue().id == null ? `${this.httpService.base_url}/types-product/create` : `${this.httpService.base_url}/types-product/update/` + paymentMethodForm.getRawValue().id

    return this.http.post(url, paymentMethodForm.value, { headers: this.authService.headers })
  }

  selectBoxProductCategories() {
    return this.http.get(`${this.httpService.base_url}/configuration/categories`, { headers: this.authService.headers })
  }

  selectBoxgetProductTypes() {
    return this.http.get(`${this.httpService.base_url}/configuration/types`, { headers: this.authService.headers })
  }

  selectBoxgetProductTaxes() {
    return this.http.get(`${this.httpService.base_url}/configuration/taxes`, { headers: this.authService.headers })
  }

  listOfProvinces() {
    return this.http.get(`${this.httpService.base_url}/provincias/listagem`, { headers: this.authService.headers })
  }

  getMunicipiosByProvincia(id: any) {
    return this.http.get(`${this.httpService.base_url}/municipios/selectBox/` + id, { headers: this.authService.headers })
  }

  getBairrosByMunicipio(id: any) {
    return this.http.get(`${this.httpService.base_url}/bairros/selectBox/` + id, { headers: this.authService.headers })
  }

  getCompany() {
    return this.http.get(`${this.httpService.base_url}/company/detail`, { headers: this.authService.headers })
  }


  getOrder(order_id: any) {
    return this.http.get(`${this.httpService.base_url}/orders/generete-printOrder/` + order_id, { headers: this.authService.headers })
  }
}
