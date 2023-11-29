import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperacoesRoutingModule } from './operacoes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { MeuPerfileComponent } from './meu-perfile/meu-perfile.component';
import { LayoutModule } from '../layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';
import { NewsComponent } from './news/news.component';
import { CreateOrEditNewsComponent } from './news/create-or-edit-news/create-or-edit-news.component';
import { FaleConnoscoListComponent } from './fale-connosco-list/fale-connosco-list.component';
import { LowStockProductsComponent } from './low-stock-products/low-stock-products.component';
import { ProductsOfPartnersComponent } from './products-of-partners/products-of-partners.component';
import { BannersComponent } from './banners/banners.component';
import { CreateOrEditBannerComponent } from './banners/create-or-edit-banner/create-or-edit-banner.component';
import { MovimentoProdutoComissaoComponent } from './movimento-produto-comissao/movimento-produto-comissao.component';


@NgModule({
  declarations: [
    MeuPerfileComponent,
    NewsComponent,
    CreateOrEditNewsComponent,
    FaleConnoscoListComponent,
    LowStockProductsComponent,
    ProductsOfPartnersComponent,
    BannersComponent,
    CreateOrEditBannerComponent,
    MovimentoProdutoComissaoComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    OperacoesRoutingModule,
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
  ]
})
export class OperacoesModule { }
