import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import{HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorsService } from "./auth-interceptors.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorsService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
