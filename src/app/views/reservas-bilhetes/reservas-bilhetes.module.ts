import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasBilhetesRoutingModule } from './reservas-bilhetes-routing.module';
import { ReservaComponent } from './pages/reserva/reserva/reserva.component';
import { BilheteComponent } from './pages/bilhete/bilhete/bilhete.component';
import { PagamentoComponent } from './pages/pagamento/pagamento/pagamento.component';
import { LayoutModule } from "src/app/views/layout/layout.module";

@NgModule({
  declarations: [
    ReservaComponent,
    BilheteComponent,
    PagamentoComponent
  ],
  imports: [
    CommonModule,
    ReservasBilhetesRoutingModule,
    LayoutModule
]
})
export class ReservasBilhetesModule {}
