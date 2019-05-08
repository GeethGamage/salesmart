import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TaskViewModel} from '../../task/view/task.component';
import {ApiService} from '../../../../services/task/api.service';
import {Stock} from '../../../../models/stock/stock';
import {StockService} from '../../../../services/stock/stock.service';

@Component({
  selector: 'app-insertstock',
  templateUrl: './insertstock.component.html',
  styleUrls: ['./insertstock.component.scss']
})
export class InsertstockComponent implements OnInit {
    @Input() copyModel: Stock;

    addModel = new Stock('','','');

    showMsg :false;
    showError:false;
    registerForm: FormGroup;
    submitted = false;

    constructor(public activeModal: NgbActiveModal,
                private formBuilder: FormBuilder,
                private stockService: StockService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            code: ['', Validators.required],
            description: ['', [Validators.required]],
            wholesalePrice: ['', [Validators.required]],
            retailPrice: ['', [Validators.required]],
        });
    }
    get f() {
        return this.registerForm.controls;
    }



    onSubmit() {
       // this.resetMessage();
        this.stockService.add( this.addModel).then((res: any) => {
            // if (CODE_SUCCESS===res.code) {
            //     this.successMessage = res.message;
            //     this.commonService.resetGrid(!this.resetGrid);
            // }
            // else{
            //     this.errorMessage=res.message;
            // }
        }).catch((err) => {
          //  this.errorMessage = err['error']['message'];

        });

    }

    resetForm(form: NgForm) {

        // form.onReset();
        this.registerForm.reset();
        this.showMsg = false;
        this.showError = false;
    }

    closeModal() {
        this.activeModal.close('Modal Closed');
    }
}
