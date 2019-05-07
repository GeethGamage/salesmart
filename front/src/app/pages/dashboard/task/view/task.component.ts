import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TaskinsertComponent} from '../insert/taskinsert.component';
import {TaskupdateComponent} from '../update/taskupdate.component';
import {ApiService} from '../../../../services/task/api.service';

declare var $;

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    model: TaskViewModel = {taskcode: '', description: '', sortkey: '', showMsg: false, showError: false};

    registerForm: FormGroup;
    submitted = false;

    dtOptions1: DataTables.Settings = {};
    dtTrigger1: Subject<any> = new Subject();
    sortColumnIndex: string;
    sortColumnName: string;
    dataTableModel1 = new DataTable();
    taskList: Task[];

    constructor(private http: HttpClient,
                private apiService: ApiService,
                private formBuilder: FormBuilder,
                private modalService: NgbModal) {
    }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            taskcode: ['', Validators.required],
            description: ['', [Validators.required]],
            sortkey: ['', [Validators.required, Validators.maxLength(2)]]
        });
        this.createTable();
    }

    get f() {
        return this.registerForm.controls;
    }

    createTable() {
        this.dtOptions1 = {
            pagingType: 'full_numbers',
            pageLength: 10,
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
                this.http
                    .post<DataTablesResponse>(
                        'http://localhost:8082/api/tasks/all',
                        this.dataTableModel1, {}
                    ).subscribe(resp => {
                    this.taskList = resp.data;

                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: []
                    });
                });
            },
            columns: [{name: 'taskcode'}, {name: 'description'}, {name: 'sortkey'}]
        };
    }

    search() {
        this.dataTableModel1.searchField = JSON.stringify(this.model);
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

    resetForm(form: NgForm) {

        // form.onReset();
        this.registerForm.reset();
        this.model.showMsg = false;
        this.model.showError = false;
    }

    open() {
        // const modalRef = this.modalService.open(ModalComponent);
        const modalRef = this.modalService.open(TaskinsertComponent);
        modalRef.componentInstance.title = 'About';
    }
}


class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
    searchField?: string;
}

export const PAGE_LENGTH = 10;

export class DataTable {

    constructor(public page?: number,
                public rows?: number,
                public pageCode?: string,
                public data?: any[],
                public searchField?: string,
                public dataList?: object[],
                public  code?: string,
                public  description?: string,
                public  status?: string,
                public recordsTotal?: number,
                public recordsFiltered?: number,
                public draw?: number,
                public dataTablesParameters?: string) {
    }
}

export class Task {

    public taskcode?: string;
    public description?: string;
    public sortkey?: string;
    public lastupdateduser?: string;
    public createdtime?: string;

    constructor(taskcode: string, description: string, sortkey: string) {
        this.taskcode = taskcode;
        this.description = description;
        this.sortkey = sortkey;
    }
}

export interface TaskViewModel {
    showError: boolean;
    showMsg: boolean;
    taskcode: string;
    description: string;
    sortkey: string;
}

