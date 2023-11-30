import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeuPerfileComponent } from './meu-perfile/meu-perfile.component';

const routes: Routes = [
  { path: 'meu-perfile', component: MeuPerfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacoesRoutingModule { }
