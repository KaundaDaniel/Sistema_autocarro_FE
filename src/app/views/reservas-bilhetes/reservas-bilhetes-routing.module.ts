import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaComponent } from './pages/reserva/reserva/reserva.component';
import { BilheteComponent } from './pages/bilhete/bilhete/bilhete.component';
import { PagamentoComponent } from './pages/pagamento/pagamento/pagamento.component';

const routes: Routes = [
{ path: 'reservas', component: ReservaComponent },
  { path: 'bilhetes', component: BilheteComponent },
  { path: 'pagamentos', component: PagamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasBilhetesRoutingModule { }
