import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacaosRoutingModule } from './facturacaos-routing.module';
import { FacturacaosComponent } from './facturacaos.component';
import { RegistarFacturaComponent } from './registar-factura/registar-factura.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ArchwizardModule } from 'angular-archwizard';
import { LayoutModule } from '../layout/layout.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    FacturacaosComponent,
    RegistarFacturaComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FacturacaosRoutingModule,
    ArchwizardModule,
    NgxPaginationModule,
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
export class FacturacaosModule { }
