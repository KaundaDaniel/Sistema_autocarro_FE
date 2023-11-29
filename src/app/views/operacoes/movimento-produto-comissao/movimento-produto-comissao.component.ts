import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigService } from 'src/app/providers/config.service';
import { ProdutoService } from '../../produtos/produto.service';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { MovimentoProdutoComissaoService } from './movimento-produto-comissao.service';

@Component({
  selector: 'app-movimento-produto-comissao',
  templateUrl: './movimento-produto-comissao.component.html',
  styleUrls: ['./movimento-produto-comissao.component.css']
})
export class MovimentoProdutoComissaoComponent implements OnInit {

  public filters = {

    search: null,
    start_date: null,
    end_date: null,
    partner_id: null,

    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public movimentos_comissao: any = []
  public loading = false;

  first_date_of_year: any
  dataAtual: any

  view_list: boolean = false;

  private searchList = new Subject<string>();

  constructor(
    public configService: ConfigService,
    public produtoService: ProdutoService,
    public translate: TranslateService,
    private movimentoProdutoComissaoService: MovimentoProdutoComissaoService
  ) {

    this.getMovimentoProdutoComissao();
    this.getFirstDateOfYear();
    this.getDataAtual();
  }

  getFirstDateOfYear() {
    const now = new Date();
    const anoAtual = now.getFullYear();
    this.first_date_of_year = `${anoAtual}-01-01`;
    this.filters.start_date = this.first_date_of_year
  }

  getDataAtual() {
    const now = new Date();
    const anoAtual = now.getFullYear();
    const mesAtual = now.getMonth() + 1;
    const diaAtual = now.getDate();
    this.dataAtual = `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-${diaAtual.toString().padStart(2, '0')}`;
    this.filters.end_date = this.dataAtual
  }

  ngOnInit(): void {
    this.searchList
      .pipe(debounceTime(300)) // Defina o tempo de espera desejado (em milissegundos)
      .subscribe(() => {
        this.getMovimentoProdutoComissao();
      });
  }

  onSearch() {
    this.searchList.next();
  }

  public getMovimentoProdutoComissao() {
    this.loading = true
    this.movimentoProdutoComissaoService.getMovimentoProdutoComissao(this.filters)
      .subscribe(res => {

        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.movimentos_comissao = Object(res).data

        if (Object(res).code == 201) {
          this.configService.toastrError(Object(res).message)
        }

        this.loading = false
      })
  }

  resetPartner() {
    this.filters.partner_id = null
  }


  previewImage(fileName: any) {
    return this.produtoService.previewImage(fileName)
  }


  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.getMovimentoProdutoComissao()
  }

  exportExcel() {
    this.produtoService.exportExcel(this.movimentos_comissao, 'Listagem de Movimento Produto Comissão')
  }

}
