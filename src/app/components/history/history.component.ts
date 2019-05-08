import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  _history:any;
  json:any = JSON; 
  constructor(private ref: ChangeDetectorRef) {    
    setInterval(() => {
      this._history =  JSON.parse(localStorage.getItem("history"));
      this._history.reverse();
      }, 2000);
    }

  ngOnInit() {
    
  }


  extract(h){
    var json = JSON.parse(JSON.stringify(h));
    
    var res_data = JSON.parse(json.req.json_res_data);
    

    return JSON.stringify(res_data,null,5);

  }

  removeh(h){
    this.extract(h);
    let history:any = JSON.parse(localStorage.getItem("history"));
    this._history.reverse();
    history.splice(this._history.indexOf(h), 1);
    localStorage.setItem("history",JSON.stringify(history));
  }

  extracturl(h){
    var json = JSON.parse(JSON.stringify(h));
    
    var url = json.url;
    
    return url;
  }
}
