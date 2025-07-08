import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { CreateOrEditClienteComponent } from './create-or-edit-cliente/create-or-edit-cliente.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from '../layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ClientesComponent,
    CreateOrEditClienteComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    TranslateModule.forChild(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
  ],
})
export class ClientesModule { }
