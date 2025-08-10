import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportesRoutingModule } from './transportes-routing.module';
import { ViagemComponent } from './viagens/pages/viagem/viagem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  declarations: [ViagemComponent],
  imports: [
    CommonModule,
    TransportesRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    ArchwizardModule,
    FormsModule,
  ],
})
export class TransportesModule {}
