import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasBilhetesRoutingModule } from './reservas-bilhetes-routing.module';
import { ReservaComponent } from './pages/reserva/reserva/reserva.component';
import { BilheteComponent } from './pages/bilhete/bilhete/bilhete.component';
import { PagamentoComponent } from './pages/pagamento/pagamento/pagamento.component';
import { LayoutModule } from 'src/app/views/layout/layout.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReservaComponent, BilheteComponent, PagamentoComponent],
  imports: [
    CommonModule,
    ReservasBilhetesRoutingModule,
    LayoutModule,
    FormsModule,
  ],
})
export class ReservasBilhetesModule {}
