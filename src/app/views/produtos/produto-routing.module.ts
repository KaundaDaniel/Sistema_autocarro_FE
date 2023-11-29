import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsOfPartnersComponent } from '../operacoes/products-of-partners/products-of-partners.component';
import { ProdutosComponent } from './produtos.component';

const routes: Routes = [
  { path: 'listar-produtos', component: ProdutosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
