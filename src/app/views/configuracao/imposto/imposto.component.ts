import { Component, OnInit } from '@angular/core';
import { ConfiguracaoService } from '../configuracao.service';


@Component({
  selector: 'app-imposto',
  templateUrl: './imposto.component.html',
  styleUrls: ['./imposto.component.css']
})
export class ImpostoComponent implements OnInit {

  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public tax: any
  public taxes: any = []

  loading = false;

  constructor(
    private configuracaoService: ConfiguracaoService
  ) {
    this.listaOfTaxes();
  }

  ngOnInit(): void { }

  listaOfTaxes() {
    this.loading = true
    this.configuracaoService.listaOfTaxes()
      .subscribe(res => {
        this.taxes = Object(res)
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.tax = item;
  }

  getPageFilterData(event: any) {

  }

}
