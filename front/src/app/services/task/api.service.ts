import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, Subject} from 'rxjs/Rx';
import {DataTable, TaskViewModel} from '../../pages/dashboard/task/view/task.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'http://localhost:8082/api';
  private SEND_TASK_URL = this.BASE_URL + '/tasks';
  options: any;
  headers: any;
  getPagesUrl: string;

    // Observable string sources
    private resetSource = new Subject<boolean>();

    // Observable string streams
    resetPage$ = this.resetSource.asObservable();


    // Observable string streams
    resetBankBranch$ = this.resetSource.asObservable();

    // Service message commands
    resetGrid(rstgrid: boolean) {
        this.resetSource.next(rstgrid);
    }
  constructor(private http: HttpClient) {this._prepare(); }

    postTask(task: TaskViewModel): Observable<any> {
        return this.http.post(this.SEND_TASK_URL, task);
    }

    updateTask(task: TaskViewModel): Observable<any> {
        return this.http.post(`${this.SEND_TASK_URL}/update`, task);
    }

    viewTask(task: TaskViewModel): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `${this.SEND_TASK_URL}/byId`;
            this.http.post(url, task, this.options).subscribe(
                (data) => {
                    //const response: ResponseBean = new ResponseBean();
                    return resolve(data);
                },
                (err) => {
                    return reject(err);
                }
            );
        });
    }
    _prepare() {

        // this.getPagesUrl = `${getEndpoint(false)}`;

        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
        this.options = {
            headers: this.headers,
            observe: 'response'
        };
    }
    getAllTaskList(dataTable: DataTable): Promise<DataTable> {
        return new Promise((resolve, reject) => {
            const url = this.SEND_TASK_URL + '/all';
            this.http.post(url, dataTable, this.options).subscribe(
                (data) => {

                    return resolve(data['body']['data'][0].value);
                },
                (err) => {
                    return reject(err);
                }
            );
        });
    }


}


