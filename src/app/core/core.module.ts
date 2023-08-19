import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule
  ],
  exports: [HeaderComponent, FooterComponent, NotFoundComponent]
})
export class CoreModule { }
