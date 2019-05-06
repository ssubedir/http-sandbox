import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Operator } from 'rxjs';
import { Config } from 'protractor';
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
  data: string;
  response:any;
  constructor(private _http:HttpClient) {
    this.http = _http;
   }

  ngOnInit() {
  }

  _setup(){
    
    this.method = (document.getElementById('gprequest')  as HTMLSelectElement).value;
    this.path = (document.getElementById('input-path')  as HTMLSelectElement).value;
    this.data = (document.getElementById('data-input') as HTMLSelectElement).value;
    this.ftype = (document.getElementById('filetype')  as HTMLSelectElement).value;

    if(this.method == "GET" && this.ftype == "JSON"){
      // get request not empty
      try{
        let obs =  this.http.get(this.path);
        obs.subscribe(
          data => {
            //this.response; console.log(JSON.stringify(data));
            (document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(data, null, 2)
          },
          error =>{
            //this.response; console.log(JSON.stringify(error));
            (document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(error, null, 2)

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
      

      let obs =  this.http.post(this.path,this.data);
        obs.subscribe(
          data => {
            //this.response; console.log(JSON.stringify(data));
            (document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(data, null, 2)
          },
          error =>{
            //this.response; console.log(JSON.stringify(error));
            (document.getElementById('http-response')  as HTMLSelectElement).value = JSON.stringify(error, null, 2)

          },
        );

      
    }
      catch(error){
        console.log(error);
      }

    }
    else if(this.method == "POST" && this.ftype == "XML"){


      
    }  
    else if(this.method == "GET" && this.ftype == "XML"){


      
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
