import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncomendaRoutingModule } from './encomenda-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { LayoutModule } from '../layout/layout.module';
import { EncomendaComponent } from './encomenda.component';
import { RegistarEncomendaComponent } from './registar-encomenda/registar-encomenda.component';
import { ArchwizardModule } from 'angular-archwizard';
import { VerHistoricoEncomendaComponent } from './ver-historico-encomenda/ver-historico-encomenda.component';
import { ValidateOrderComponent } from './validate-order/validate-order.component';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { UpdateDeliveryAddressComponent } from './update-delivery-address/update-delivery-address.component';


@NgModule({
  declarations: [
    EncomendaComponent,
    RegistarEncomendaComponent,
    VerHistoricoEncomendaComponent,
    ValidateOrderComponent,
    UpdateDeliveryAddressComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    EncomendaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ArchwizardModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCTOukbn64mybdh8NDWQGbqb4imGEm1QHs"
    }),
    TranslateModule.forChild(),
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
export class EncomendaModule { }
