import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';
import { RequestComponent } from './components/request/request.component';
import { HttpClientModule } from '@angular/common/http';
import { DownloadComponent } from './components/download/download.component';
import { HistoryComponent } from './components/history/history.component';
import { ResponseComponent } from './components/response/response.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SandboxComponent,
    RequestComponent,
    DownloadComponent,
    HistoryComponent,
    ResponseComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTreeModule,MatIconModule,MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
