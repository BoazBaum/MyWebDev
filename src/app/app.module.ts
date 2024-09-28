import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeOpenScreenComponent } from './home-open-screen/home-open-screen.component';
import { HomeProccesseWebBuildComponent } from './home-proccesse-web-build/home-proccesse-web-build.component';
import { HomeScreensDesigenComponent } from './home-screens-desigen/home-screens-desigen.component';
import { FooterComponent } from './footer/footer.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    HomeOpenScreenComponent,
    HomeProccesseWebBuildComponent,
    HomeScreensDesigenComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,  // Add HttpClientModule
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
