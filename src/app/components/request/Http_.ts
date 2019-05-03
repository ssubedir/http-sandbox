import { HttpClient } from 'selenium-webdriver/http';
import { Component, OnInit,Injectable } from '@angular/core';

@Injectable()
export class Http_{

    http:HttpClient;
    input:string;
    method:string;
    path:string;
    data: string;
    response:any;

    constructor(private _http:HttpClient) {
        this.http = _http;
       }
    
}
  