import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public category: any
  public products_category: any = []

  loading = false;

  constructor(
    private categoriaService: CategoriaService
  ) {
    this.listaOfCategorias();
  }

  ngOnInit(): void { }

  listaOfCategorias() {
    this.loading = true
    this.categoriaService.listaOfCategorias()
      .subscribe(res => {
        this.products_category = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.loading = false
      })
  }

  setCategoria(item: any) {
    this.category = item;
  }

  getPageFilterData(event: any) {

  }
}
