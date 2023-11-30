import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessosJuridicosRoutingModule } from './processos-juridicos-routing.module';
import { ProcessosJuridicosComponent } from './processos-juridicos.component';
import { CreateOrEditProcessosComponent } from './create-or-edit-processos/create-or-edit-processos.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AssociarAdvogadoComponent } from './associar-advogado/associar-advogado.component';


@NgModule({
  declarations: [
    ProcessosJuridicosComponent,
    CreateOrEditProcessosComponent,
    AssociarAdvogadoComponent
  ],
  imports: [
    CommonModule,
    ProcessosJuridicosRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ArchwizardModule,
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
export class ProcessosJuridicosModule { }
