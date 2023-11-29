import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfigService } from 'src/app/providers/config.service';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public filters = {
    search: null,
    start_date: null,
    end_date: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }
  public new: any
  public news: any = []
  public loading = false;

  first_date_of_year: any
  dataAtual: any

  private searchNews = new Subject<string>();

  constructor(
    public configService: ConfigService,
    public newsService: NewsService,
    public translate: TranslateService,
  ) {
    this.listaOfNews();

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
    this.searchNews
      .pipe(debounceTime(300)) // Defina o tempo de espera desejado (em milissegundos)
      .subscribe(() => {
        this.listaOfNews();
      });
  }

  onSearch() {
    this.searchNews.next();
  }

  public listaOfNews() {
    this.loading = true
    this.newsService.listaOfNews(this.filters)
      .subscribe(res => {
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.news = Object(res).data
        this.loading = false
      })
  }

  previewImage(fileName: any) {
    return this.newsService.previewImage(fileName)
  }

  setProduct(item: any) {
    this.new = item;
  }

  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.listaOfNews()
  }

  exportExcel() {
    this.newsService.exportExcel(this.news, 'Listagem de Notícias')
  }
}
