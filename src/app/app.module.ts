import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { RequestComponent } from './components/request/request.component';
import { HttpClientModule } from '@angular/common/http';
import { DownloadComponent } from './components/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    SandboxComponent,
    RequestComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
