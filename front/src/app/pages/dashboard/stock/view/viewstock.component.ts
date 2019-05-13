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
                         //console.log(data);
                    this.stockList=data.dataList;
                    callback({
                        recordsTotal: 25,
                        recordsFiltered: 25,
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

    openUpdateModal(record: Task) {
        const modalRef = this.modalService.open(TaskupdateComponent);
        modalRef.componentInstance.record = record;
    }
    openDeleteModal(record: Task) {
        alert('Delete');
        // const modalRef = this.modalService.open(PagedeleteComponent);
        // modalRef.componentInstance.page = record;
    }

    openViewModal(record :Task) {
        alert('view');
        // const modalRef = this.modalService.open(PagedeleteComponent);
        // modalRef.componentInstance.view = true;
        // modalRef.componentInstance.page = record;
    }
    resetForm() {
        this.stock.code = '';
        this.stock.name = '';
        this.search();
        this.showMsg = false;
        this.showError = false;
    }

    openAddModal() {
        const modalRef = this.modalService.open(InsertstockComponent);
    }

}


