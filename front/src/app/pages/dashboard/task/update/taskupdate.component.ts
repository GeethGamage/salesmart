import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TaskViewModel} from '../view/task.component';
import {ApiService} from '../../../../services/task/api.service';

@Component({
    selector: 'app-taskupdate',
    templateUrl: './taskupdate.component.html',
    styleUrls: ['./taskupdate.component.scss']
})
export class TaskupdateComponent implements OnInit {

    model: TaskViewModel = {taskcode: '', description: '', sortkey: '', showMsg: false, showError: false};

    registerForm: FormGroup;
    submitted = false;
    @Input() record: TaskViewModel;

    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private apiService: ApiService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            taskcode: ['', Validators.required],
            description: ['', [Validators.required]],
            sortkey: ['', [Validators.required, Validators.maxLength(2)]]
        });

        this.getUpdatePopupData(this.record);

    }

    getUpdatePopupData(taskViewModel: TaskViewModel) {
        try {
            this.apiService.viewTask(taskViewModel).then((data) => {
                this.model = data['body'];
                console.log(data);
            });
        } catch (e) {
            console.log('Logout, Can not parse profileSections: ', e);
        }
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.apiService.updateTask(this.model).subscribe(
            res => {
                this.model.showMsg = true;
                // this.tb.ajax.reload();
            },
            err => {
                this.model.showError = true;
                // alert(err.message);
                // alert('An error has occurred while sending task');
            }
        )
    }

    resetForm(form: NgForm) {
        this.getUpdatePopupData(this.record);
        // form.onReset();
        // this.registerForm.reset();
        // this.model.showMsg = false;
        // this.model.showError = false;
    }

    closeModal() {
        this.activeModal.close('Modal Closed');
    }

}
