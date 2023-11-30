import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessosJuridicosComponent } from './processos-juridicos.component';

const routes: Routes = [
  { path: 'listagem_processos', component: ProcessosJuridicosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessosJuridicosRoutingModule { }
