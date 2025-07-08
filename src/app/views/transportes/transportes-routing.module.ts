import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'autocarros',
    loadChildren: () =>
      import('./autocarros/autocarros.module').then((m) => m.AutocarrosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportesRoutingModule {}
