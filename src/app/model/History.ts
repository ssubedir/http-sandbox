export class History{

    json_res_data:string;
    json_req_data: string;
    reqmethod:string;
    response:string;
    
    constructor(reqdata:string,method:string,resdata:string,res:string) {
        this.json_req_data = reqdata;
        this.json_res_data = resdata;
        this.reqmethod = method;
        this.response = res;
    }    
}
  