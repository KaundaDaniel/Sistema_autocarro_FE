import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  current_user: any;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    public auth: AuthService
  ) {
    this.current_user = authService.current_user()
  }


  canActivateRouterLink(permission: string): boolean {
    return this.auth.canActivateRouterLink(permission);
  }

  ngOnInit(): void {
  }

}
