import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  constructor() { }

  list_reportings = [
    { title: 'Encomendas', sub_modulo: 'Encomendas Por Operador', path_url: '/relatorios/encomendas_por_operador' },
    //{ title: 'Facturação', sub_modulo: 'Facturas Por Operador', path_url: '/relatorios/facturao_por_operador' },
  ]

  reporting = {
    title: null,
    sub_modulo: null,
    path_url: null
  };

  ngOnInit(): void {
    this.resetReporting()
  }

  setReportin(item: any) {
    this.reporting.title = item.title
    this.reporting.sub_modulo = item.sub_modulo
    this.reporting.path_url = item.path_url
  }

  resetReporting() {
    this.reporting.title = null
    this.reporting.sub_modulo = null
    this.reporting.path_url = null
  }
}
