import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannersComponent } from './banners/banners.component';
import { FaleConnoscoListComponent } from './fale-connosco-list/fale-connosco-list.component';
import { LowStockProductsComponent } from './low-stock-products/low-stock-products.component';
import { MeuPerfileComponent } from './meu-perfile/meu-perfile.component';
import { NewsComponent } from './news/news.component';
import { ProductsOfPartnersComponent } from './products-of-partners/products-of-partners.component';
import { MovimentoProdutoComissaoComponent } from './movimento-produto-comissao/movimento-produto-comissao.component';

const routes: Routes = [
  { path: 'meu-perfile', component: MeuPerfileComponent },
  { path: 'noticias', component: NewsComponent },
  { path: 'banners-loja', component: BannersComponent },
  { path: 'mensagens/faleConnosco', component: FaleConnoscoListComponent },
  { path: 'productos/stock_baixo', component: LowStockProductsComponent },
  { path: 'productos/of_partners', component: ProductsOfPartnersComponent },
  { path: 'productos/movimento_comissao', component: MovimentoProdutoComissaoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacoesRoutingModule { }
