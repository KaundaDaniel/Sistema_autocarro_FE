import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AutocarrosRoutingModule } from './autocarros-routing.module';
import { AutocarroComponent } from './pages/autocarro/autocarro.component';
import { LayoutModule } from '../../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocarroDetalhesComponent } from './pages/autocarro/autocarro-detalhes/autocarro-detalhes.component';

@NgModule({
  declarations: [AutocarroComponent, AutocarroDetalhesComponent],
  imports: [
    CommonModule,
    AutocarrosRoutingModule,
    LayoutModule,
    LayoutModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
})
export class AutocarrosModule {}
