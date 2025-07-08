import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutocarroComponent } from './pages/autocarro/autocarro.component';
import { AutocarroDetalhesComponent } from './pages/autocarro/autocarro-detalhes/autocarro-detalhes.component';

const routes: Routes = [
  {
    path: '',
    component: AutocarroComponent,
  },
  {
    path: ':id',
    component: AutocarroDetalhesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutocarrosRoutingModule {}
