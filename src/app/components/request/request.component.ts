import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Operator } from 'rxjs';
import { Config } from 'protractor';
import { History } from 'src/app/model/History';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})

@Injectable()
export class RequestComponent implements OnInit {

  http:HttpClient;
  input:string;
  method:string;
  ftype:string;
  path:string;
  _data: string;
  response:any;
  rhash:any;
  request_history:History;

  constructor(private _http:HttpClient) {
    this.http = _http;
    var d = new Date();
    this.rhash = d.getDate();
   }

  ngOnInit() {
  }

  _setup(){
    
    this.method = (document.getElementById('gprequest')  as HTMLSelectElement).value;
    this.path = (document.getElementById('input-path')  as HTMLSelectElement).value;
    this._data = (document.getElementById('data-input') as HTMLSelectElement).value;
    this.ftype = (document.getElementById('filetype')  as HTMLSelectElement).value;
    
    if(this.method == "GET" && this.ftype == "JSON"){
      // get request not empty
      try{
        let obs =  this.http.get(this.path);
        obs.subscribe(
          data => {
            //this.response; console.log(JSON.stringify(error));
            (document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(data, null, 2)
            this.request_history = new History(JSON.stringify(this._data),this.method,JSON.stringify(data),"true")

            if (typeof(Storage) !== "undefined") {
              
              if(localStorage.getItem("history") == null){

                let temp:any = [{
                  req: this.request_history,
                  "url": this.path
                }]             
                
                localStorage.setItem("history",JSON.stringify(temp));
                console.log(JSON.stringify(temp,null,2));

              }
              else{
                
                let history:any = JSON.parse(localStorage.getItem("history"));
                history.push({
                  req:this.request_history,
                  "url": this.path

                });

                localStorage.setItem("history",JSON.stringify(history));
                console.log(JSON.stringify(history,null,2));
              }

            } else {
              console.log("Browser not supported.")
            }
          },
          error =>{
            (document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(error, null, 2)
            this.request_history = new History(JSON.stringify(this._data),this.method,JSON.stringify(error),"false")

            if (typeof(Storage) !== "undefined") {
              
              if(localStorage.getItem("history") == null){

                let temp:any = [{
                  req: this.request_history,
                  "url": this.path

                }]             
                
                localStorage.setItem("history",JSON.stringify(temp));
                console.log(JSON.stringify(temp,null,2));

              }
              else{
                
                let history:any = JSON.parse(localStorage.getItem("history"));
                history.push({
                  req:this.request_history
                });

                localStorage.setItem("history",JSON.stringify(history));
                console.log(JSON.stringify(history,null,2));
              }

            } else {
              console.log("Browser not supported.")
            }
          },
        );

      }
      catch(error){
        console.log(error);
      }

    } 
    else if(this.method == "POST" && this.ftype == "JSON"){
      // post request

      try{
      

      let obs =  this.http.post(this.path,this._data);
      obs.subscribe(
        data => {
          //this.response; console.log(JSON.stringify(error));
          (document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(data, null, 2)
          this.request_history = new History(JSON.stringify(this._data),this.method,JSON.stringify(data),"true")

          if (typeof(Storage) !== "undefined") {
            
            if(localStorage.getItem("history") == null){

              let temp:any = [{
                req: this.request_history,
                "url": this.path
              }]             
              
              localStorage.setItem("history",JSON.stringify(temp));
              console.log(JSON.stringify(temp));

            }
            else{
              
              let history:any = JSON.parse(localStorage.getItem("history"));
              history.push({
                req:this.request_history,
                "url": this.path

              });

              localStorage.setItem("history",JSON.stringify(history));
              console.log(JSON.stringify(history,null,2));
            }

          } else {
            console.log("Browser not supported.")
          }
        },
        error =>{
          (document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(error, null, 2)
          this.request_history = new History(JSON.stringify(this._data),this.method,JSON.stringify(error),"false")

          if (typeof(Storage) !== "undefined") {
            
            if(localStorage.getItem("history") == null){

              let temp:any = [{
                req: this.request_history,
                "url": this.path
              }]             
              
              localStorage.setItem("history",JSON.stringify(temp));
              console.log(JSON.stringify(temp,null,2));

            }
            else{
              
              let history:any = JSON.parse(localStorage.getItem("history"));
              history.push({
                req:this.request_history,
                "url": this.path

              });

              localStorage.setItem("history",JSON.stringify(history));
              console.log(JSON.stringify(history,null,2));
            }

          } else {
            console.log("Browser not supported.")
          }
        },
      );
      
    }
      catch(error){
        console.log(error);
      }

    }

      
     
    else{
      // error
    }

  }

  _fill(){
     var d = {
        "name": "bob smith",
        "message": "Hello World",
        age: 26
    };

    (document.getElementById('data-input') as HTMLSelectElement).value = JSON.stringify(d, null, 2);
  }

  
  objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + obj[p] + '\n';
        }
    }
    return str;
}
}
