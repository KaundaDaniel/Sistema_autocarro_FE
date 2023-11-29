import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ConfigService } from 'src/app/providers/config.service';
import { BannerService } from './banner.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {


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
  public banner: any
  public banners: any = []
  public loading = false;

  first_date_of_year: any
  dataAtual: any

  private searchNews = new Subject<string>();

  constructor(
    public configService: ConfigService,
    public bannerService: BannerService,
  ) {
    this.listaOfBanners();

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
        this.listaOfBanners();
      });
  }

  onSearch() {
    this.searchNews.next();
  }

  public listaOfBanners() {
    this.loading = true
    this.bannerService.listaOfBanners(this.filters)
      .subscribe(res => {
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;
        this.banners = Object(res).data
        this.loading = false
      })
  }

  previewImage(fileName: any) {
    return this.bannerService.previewImage(fileName)
  }

  setProduct(item: any) {
    this.banner = item;
  }

  getPageData(pageNumber: any) {
    this.filters.pagination.page = pageNumber
    this.listaOfBanners()
  }

}
