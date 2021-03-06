import { Component, OnInit } from '@angular/core';
import {DataTable, Task, TaskViewModel} from '../../task/view/task.component';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TaskinsertComponent} from '../../task/insert/taskinsert.component';
import {TaskupdateComponent} from '../../task/update/taskupdate.component';
import {ApiService} from '../../../../services/task/api.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from '../../../../../../node_modules/rxjs/Rx';
import {Stock} from '../../../../models/stock/stock';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StockService} from '../../../../services/stock/stock.service';
import {InsertstockComponent} from '../insert/insertstock.component';
import {UpdatestockComponent} from '../update/updatestock.component';
import {DeletestockComponent} from '../delete/deletestock.component';

@Component({
  selector: 'app-viewstock',
  templateUrl: './viewstock.component.html',
  styleUrls: ['./viewstock.component.scss']
})
export class ViewstockComponent implements OnInit {


    stock = new Stock('', '', 0);

    registerForm: FormGroup;

    dtOptions1: DataTables.Settings = {};
    dtTrigger1: Subject<any> = new Subject();
    sortColumnIndex: string;
    sortColumnName: string;
    dataTableModel1 = new DataTable();
    stockList: Stock[];




    showMsg :false;
    showError:false;

    constructor(private stockService:StockService,
                private apiService: ApiService,
                private formBuilder: FormBuilder,
                private modalService: NgbModal) {
    }

    ngOnInit() {

        this.createTable();
    }



    createTable() {
        this.dtOptions1 = {
            pagingType: 'full_numbers',
            pageLength: 5,
            serverSide: true,
            processing: true,
            autoWidth: false,
            destroy: true,
            order: [],
            ajax: (dataTablesParameters: any, callback) => {
                if (dataTablesParameters.order[0]) {
                    this.sortColumnIndex = dataTablesParameters.order[0].column;
                    this.sortColumnName = dataTablesParameters.columns[this.sortColumnIndex].name;
                    dataTablesParameters.order[0].column = this.sortColumnName;
                }
                this.dataTableModel1.dataTablesParameters = JSON.stringify(dataTablesParameters);
                this.stockService.viewStock(this.dataTableModel1).then((data: DataTable) => {
                         console.log(data);
                    this.stockList=data.dataList;
                    callback({
                        recordsTotal: data.recordsTotal,
                        recordsFiltered: data.recordsFiltered,
                        data: [],
                    });
                });
            },
            columns: [{name: 'taskcode'}, {name: 'description'}, {name: 'sortkey'}]
        };
    }

    search() {
        this.dataTableModel1.searchField = JSON.stringify(this.stock);
        this.dtTrigger1.next();
    }
    openAddModal() {
        const modalRef = this.modalService.open(InsertstockComponent);
    }

    openUpdateModal(record: Stock) {
        const modalRef = this.modalService.open(UpdatestockComponent);
        modalRef.componentInstance.stock = record;
    }
    openDeleteModal(record: Stock) {
        const modalRef = this.modalService.open(DeletestockComponent);
        modalRef.componentInstance.stock = record;
    }

    openViewModal(record :Stock) {
        const modalRef = this.modalService.open(DeletestockComponent);
        modalRef.componentInstance.view = true;
        modalRef.componentInstance.stock = record;
    }
    resetForm() {
        this.stock.code = '';
        this.stock.name = '';
        this.search();
        this.showMsg = false;
        this.showError = false;
    }



}


