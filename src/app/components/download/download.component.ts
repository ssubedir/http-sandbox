import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  method:string;

  constructor() { }

  ngOnInit() {
  }

  download(filename:string, text:string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  downloadFile(){
    let data:string = (document.getElementById('http-response')  as HTMLSelectElement).value;
    

    this.method = (document.getElementById('filetype')  as HTMLSelectElement).value;


    if(this.method == "JSON"){
      if(data==""){ // empty
        (document.getElementById('error')  as HTMLSelectElement).value = "Empty Response."
      }else{ // not empty
        let fname:string = "response.json";
        this.download(fname,data);
      }
    }
    else{
      if(data==""){ // empty
        (document.getElementById('error')  as HTMLSelectElement).value = "Empty Response."
      }else{ // not empty
        let fname:string = "response.xml";
        this.download(fname,data);
      }
    }

    

  }
}
