import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataTable} from '../../models/datatable/datatable';
import {Subject} from '../../../../node_modules/rxjs/Rx';
import {getEndpoint} from '../../utility/constants';
import {Stock} from '../../models/stock/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {


    constructor(private http: HttpClient) {
        this._prepare();
    }


    listUrl: string;
    addUrl: string;
    findUrl: string;
    updateUrl: string;
    deleteUrl: string;





    options: any;
    headers: any;

    _prepare() {

        this.listUrl = `${getEndpoint(false)}/Stock/Get`;
        this.addUrl = `${getEndpoint(false)}/Stock/Insert`;
        this.findUrl = `${getEndpoint(false)}/Stock/Find`;
        this.updateUrl = `${getEndpoint(false)}/Stock/Update`;
        this.deleteUrl = `${getEndpoint(false)}/Stock/Delete`;



        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
        this.options = {
            headers: this.headers,
            observe: 'response'
        };
    }
    viewStock(dataTable: DataTable): Promise<DataTable> {
        return new Promise((resolve, reject) => {
            this.http.post(this.listUrl,dataTable, this.options).subscribe(
                (data) => {
                    return resolve(data['body']);
                },
                (err) => {
                    return reject(err);
                }
            );
        });
    }
    add( stock: Stock): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(this.addUrl, stock, this.options).subscribe(
                (data) => {
                    //  const response: ResponseBean = new ResponseBean();
                    return resolve(data['body']);
                },
                (err) => {
                    return reject(err);
                }
            );
        });
    }

    find(stock: Stock) {
        return new Promise((resolve, reject) => {
            this.http.post(this.findUrl, stock, this.options).subscribe(
                (data) => {
                    // const response: ResponseBean = new ResponseBean();
                    return resolve(data);
                },
                (err) => {
                    alert(err);
                    return reject(err);
                }
            );
        });
    }

    update(stock: Stock): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(this.updateUrl, stock, this.options).subscribe(
                (data) => {
                    // const response: ResponseBean = new ResponseBean();
                    return resolve(data['body']);
                },
                (err) => {
                    return reject(err);
                }
            );
        });
    }

    delete(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(this.deleteUrl+"/"+id).subscribe(
                (data) => {
                    return resolve(data['body']);
                },
                (err) => {
                    return reject(err);
                }
            );
        });
    }

}
