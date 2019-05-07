import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TaskViewModel} from '../view/task.component';
import {ApiService} from '../../../../services/task/api.service';


@Component({
  selector: 'app-taskinsert',
  templateUrl: './taskinsert.component.html',
  styleUrls: ['./taskinsert.component.scss']
})
export class TaskinsertComponent implements OnInit {

    model: TaskViewModel = {taskcode: '', description: '', sortkey: '', showMsg: false, showError: false};

    registerForm: FormGroup;
    submitted = false;

  constructor(public activeModal: NgbActiveModal,private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          taskcode: ['', Validators.required],
          description: ['', [Validators.required]],
          sortkey: ['', [Validators.required, Validators.maxLength(2)]]
      });
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

        this.apiService.postTask(this.model).subscribe(
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

        // form.onReset();
        this.registerForm.reset();
        this.model.showMsg = false;
        this.model.showError = false;
    }

    closeModal() {
        this.activeModal.close('Modal Closed');
    }
}
