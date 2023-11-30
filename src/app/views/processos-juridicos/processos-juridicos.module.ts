import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessosJuridicosRoutingModule } from './processos-juridicos-routing.module';
import { ProcessosJuridicosComponent } from './processos-juridicos.component';
import { CreateOrEditProcessosComponent } from './create-or-edit-processos/create-or-edit-processos.component';


@NgModule({
  declarations: [
    ProcessosJuridicosComponent,
    CreateOrEditProcessosComponent
  ],
  imports: [
    CommonModule,
    ProcessosJuridicosRoutingModule
  ]
})
export class ProcessosJuridicosModule { }
