import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViagemComponent } from './viagens/pages/viagem/viagem.component';

const routes: Routes = [
  {
    path: 'autocarros',
    loadChildren: () =>
      import('./autocarros/autocarros.module').then((m) => m.AutocarrosModule),
  },
  { path: 'viagens', component: ViagemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportesRoutingModule {}
