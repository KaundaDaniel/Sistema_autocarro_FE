import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SpinnerOverlayComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SpinnerOverlayComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
  ]
})
export class LayoutModule { }
