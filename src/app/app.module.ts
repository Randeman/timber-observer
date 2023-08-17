import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapModule } from './map/map.module';
import { ObserverComponent } from './observer/observer.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

import { ReportModule } from './report/report.module';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppInterceptorProvider } from './app.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    ObserverComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MapModule,
    SharedModule,
    AuthModule,
    CoreModule,
    ReportModule,
    AppRoutingModule
  ],
  providers: [AppInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
