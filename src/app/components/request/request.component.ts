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
  //request_history:History;

  constructor(private _http:HttpClient) {
    this.http = _http;
    var d = new Date();
    this.rhash = d.getDate();
   }

  ngOnInit() {
  }

  _setup(){
    
    this.method = (document.getElementById('gprequest')  as HTMLSelectElement).value;
    console.log(this.method);
    this.path = (document.getElementById('input-path')  as HTMLSelectElement).value;
    console.log(this.path);
    this._data = (document.getElementById('data-input') as HTMLSelectElement).value;
    console.log(this._data);
    this.ftype = "JSON";
    if(this.method == "GET" && this.ftype == "JSON"){
      // get request not empty
      console.log("gg");
      try{
        let obs =  this.http.get(this.path);
        obs.subscribe(
          data => {
            //(document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(data, null, 2)
            //this.request_history = new History(JSON.stringify(this._data),this.method,JSON.stringify(data),"true")

            localStorage.setItem("response",JSON.stringify(data));
            console.log(JSON.stringify(JSON.parse(localStorage.getItem("response")),null,2));


            if (typeof(Storage) !== "undefined") {
              
              if(localStorage.getItem("history") == null){

                let temp:any = [{
                  res:data,
                  "url": this.path
                }]             
                
                localStorage.setItem("history",JSON.stringify(temp));
                document.location.reload();

              }
              else{
                
                let history:any = JSON.parse(localStorage.getItem("history"));
                history.push({
                  res:data,
                  "url": this.path

                });

                localStorage.setItem("history",JSON.stringify(history));
                document.location.reload();
                
              }

            } else {
              console.log("Browser not supported.")
            }
          },
          error =>{
            //(document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(error, null, 2)
            //this.request_history = new History(JSON.stringify(this._data),this.method,JSON.stringify(error),"false")

            localStorage.setItem("response",JSON.stringify(error));
            //console.log(JSON.stringify(localStorage.getItem("response"),null,2));


            if (typeof(Storage) !== "undefined") {
              
              if(localStorage.getItem("history") == null){

                let temp:any = [{
                  res:error,
                  "url": this.path

                }]             
                
                localStorage.setItem("history",JSON.stringify(temp));
                document.location.reload();

              }
              else{
                
                let history:any = JSON.parse(localStorage.getItem("history"));
                history.push({
                  res:error,
                  "url": this.path
                });

                localStorage.setItem("history",JSON.stringify(history));
                document.location.reload();
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
          //(document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(data, null, 2)
          //this.request_history = new History(JSON.stringify(this._data),this.method,JSON.stringify(data),"true")

          localStorage.setItem("response",JSON.stringify(data));
          //console.log(JSON.stringify(localStorage.getItem("response"),null,2));


          if (typeof(Storage) !== "undefined") {
            
            if(localStorage.getItem("history") == null){

              let temp:any = [{
                res:data,
                  "url": this.path
              }]             
              
              localStorage.setItem("history",JSON.stringify(temp));
              document.location.reload();

            }
            else{
              
              let history:any = JSON.parse(localStorage.getItem("history"));
              history.push({
                res:data,
                "url": this.path

              });

              localStorage.setItem("history",JSON.stringify(history));
              document.location.reload();
            }

          } else {
            console.log("Browser not supported.")
          }
        },
        error =>{
          //(document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(error, null, 2)
          //this.request_history = new History(JSON.stringify(this._data),this.method,JSON.stringify(error),"false")

          localStorage.setItem("response",JSON.stringify(error));
          //console.log(JSON.stringify(localStorage.getItem("response"),null,2));


          if (typeof(Storage) !== "undefined") {
            
            if(localStorage.getItem("history") == null){

              let temp:any = [{
                res:error,
                  "url": this.path
              }]             
              
              localStorage.setItem("history",JSON.stringify(temp));
              document.location.reload();

            }
            else{
              
              let history:any = JSON.parse(localStorage.getItem("history"));
              history.push({
                res:error,
                "url": this.path

              });

              localStorage.setItem("history",JSON.stringify(history));
              document.location.reload();
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
