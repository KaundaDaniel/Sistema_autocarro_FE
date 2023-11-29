import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatoriosComponent } from './relatorios.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArchwizardModule } from 'angular-archwizard';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { EncomendasPorOperadorComponent } from './encomendas-por-operador/encomendas-por-operador.component';
import { FacturasPorOperadorComponent } from './facturas-por-operador/facturas-por-operador.component';


@NgModule({
  declarations: [
    RelatoriosComponent,
    EncomendasPorOperadorComponent,
    FacturasPorOperadorComponent
  ],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    NgxPaginationModule,
    ArchwizardModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
  ]
})
export class RelatoriosModule { }
