import {Component, Input, OnInit} from '@angular/core';
import {Stock} from '../../../../models/stock/stock';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {StockService} from '../../../../services/stock/stock.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-updatestock',
  templateUrl: './updatestock.component.html',
  styleUrls: ['./updatestock.component.scss']
})
export class UpdatestockComponent implements OnInit {

    @Input() code: string;
    public updateModel = new Stock('', '', 0);

    showMsg :false;
    showError:false;

    public resetGrid = false;


    constructor(public activeModal: NgbActiveModal,
                public http: HttpClient,
                private stockService: StockService ) { }


    form = new FormGroup({
        code: new FormControl('', [Validators.required]),
        description: new FormControl('',[ Validators.required]),
        wholesalePrice: new FormControl('',[ Validators.required]),
        retailPrice: new FormControl('',[ Validators.required]),
    });
    ngOnInit() {
        this.find();
    }

    closeModal() {
        this.activeModal.close('Modal Closed');
    }
    onSubmit() {
        this.resetMessages();
            this.stockService.update(this.updateModel).then((res: any) => {
              console.log(res);
            }).catch((err) => {
                //this.errorMessage = err['error']['message'];

            });

    }
    find() {
        this.resetMessages();
        this.updateModel.code = this.code;
        this.stockService.find(this.updateModel).then((data) => {
            this.updateModel = data['body']['data'][0].value;


        }).catch((err) => {
          //  this.errorMessage = err['error']['message'];

        });
    }
    resetMessages() {
        this.showError =false;
        this.showMsg = false;
    }

    setStatusValue() {
       // this.updateModel.status.value = new String($( '#status option:selected' ).text());
    }

}
