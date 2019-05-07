import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataTable} from '../../models/datatable/datatable';
import {Subject} from '../../../../node_modules/rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class StockService {


    constructor(private http: HttpClient) {
        this._prepare();
    }


    listUrl: string;
    allUrl: string;




    options: any;
    headers: any;

    _prepare() {

        //this.viewAddUrl = `${getEndpoint(false)}/bank/viewAdd`;
        this.listUrl = `http://192.168.1.190:8080/Api/Stock/List`;
        //http://192.168.1.232:8080/ECBSV1_00//api/v1/bank/viewAdd
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
        this.options = {
            headers: this.headers,
            observe: 'response'
        };
    }
    viewStock(dataTable: DataTable): Promise<DataTable> {
        console.log(dataTable);
        return new Promise((resolve, reject) => {
            this.http.post(this.listUrl,dataTable, this.options).subscribe(
                (data) => {
                    console.log(data);
                    return resolve(data['body']);
                },
                (err) => {
                    return reject(err);
                }
            );
        });
    }
    viewStock2() {
        return new Promise((resolve, reject) => {
            this.http.get(this.listUrl, this.options).subscribe(
                (data) => {
                    return resolve(data);
                },
                (err) => {
                    return reject(err);

                }
            );
        });
    }

}
