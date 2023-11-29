import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'web';

  isLoggedIn: boolean = sessionStorage.getItem('sessionToken') ? true : false

  constructor(
    private router: Router,
    public translate: TranslateService
  ) {

  
    this.isNotlogged()

    var lang = localStorage.getItem('lang') || 'pt'
    translate.setDefaultLang(lang);
    translate.use(lang);
  }

  isNotlogged(){
    
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login')
    }

  }

}
