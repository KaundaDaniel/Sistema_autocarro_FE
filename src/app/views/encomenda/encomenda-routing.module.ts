import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncomendaComponent } from './encomenda.component';
import { RegistarEncomendaComponent } from './registar-encomenda/registar-encomenda.component';

const routes: Routes = [
  { path: 'listar-encomendas', component: EncomendaComponent },
  { path: 'registar-encomenda', component: RegistarEncomendaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncomendaRoutingModule { }
