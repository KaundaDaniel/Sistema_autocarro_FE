import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public filters = {
    search: null,
    pagination: {
      page: 1,
      perPage: 5,
      total: 0,
      lastPage: 0
    }
  }

  public user: any
  public users: any = []
  public loading = false;

  constructor(
    private userService: UserService,
    public translate: TranslateService
  ) {
    this.listaOfUsers();
  }

  ngOnInit(): void { }

  listaOfUsers() {

    this.loading = true

    this.userService.listaOfUsers(this.filters)
      .subscribe(res => {

        this.users = Object(res).data
        this.filters.pagination.lastPage = Object(res).lastPage;
        this.filters.pagination.page = Object(res).page;
        this.filters.pagination.total = Object(res).total;
        this.filters.pagination.perPage = Object(res).perPage;

        this.loading = false
      })
  }

  setUser(item: any) {
    this.user = item;
  }

  getPageFilterData(event: any) {

  }

  exportExcel() {
    //this.clientesService.exportExcel(this.customers, 'Listagem de Clientes')
  }

}
