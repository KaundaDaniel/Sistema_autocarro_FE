import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncomendasPorOperadorComponent } from './encomendas-por-operador/encomendas-por-operador.component';
import { RelatoriosComponent } from './relatorios.component';
import { FacturasPorOperadorComponent } from './facturas-por-operador/facturas-por-operador.component';

const routes: Routes = [
  { path: 'reporting_bi', component: RelatoriosComponent },
  { path: 'encomendas_por_operador', component: EncomendasPorOperadorComponent },
  { path: 'facturao_por_operador', component: FacturasPorOperadorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
