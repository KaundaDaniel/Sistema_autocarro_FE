import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/providers/auth.service';
import { ConfigService } from 'src/app/providers/config.service';
import { HttpService } from 'src/app/providers/http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  notifications: any = [];

  current_user: any;

  handLanguage: any = localStorage.getItem('lang') || 'pt';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService,
    private configService: ConfigService,
    public translate: TranslateService,
  ) {

    this.isNotOnline()
    this.getLastsNotifications()
    this.current_user = authService.current_user()
  }

  ngOnInit(): void { }

  logout() {
    this.authService.removeTokenOfUser()
  }

  changeLanguage(event: any) {
    const lang = event.target.value
    this.setLanguage(lang)

    this.reloadPage()
  }

  isNotOnline() {

    if (!navigator.onLine) {
      this.configService.toastrWarning('Sem conexão à internet');
    }

  }

  reloadPage() {
    window.location.reload();
  }

  getLastsNotifications() {
    this.http.get(this.httpService.base_url + '/admin/last_notifications', { headers: this.authService.headers })
      .subscribe(res => {
        this.notifications = Object(res)
      })
  }

  readNotification(notification: any) {

    this.http.patch(`${this.httpService.base_url}/admin/read-notification/${notification.id}`, null, { headers: this.authService.headers })
      .subscribe(response => {
        console.log(response)
        this.getLastsNotifications()
      })
  }

  setLanguage(lang: any) {
    localStorage.setItem('lang', lang)
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

}
