import {Component, Input, OnInit} from '@angular/core';
import {Stock} from '../../../../models/stock/stock';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {StockService} from '../../../../services/stock/stock.service';

@Component({
  selector: 'app-deletestock',
  templateUrl: './deletestock.component.html',
  styleUrls: ['./deletestock.component.scss']
})
export class DeletestockComponent implements OnInit {

    @Input() stock: Stock;
    @Input() view: boolean;

    showMsg :false;
    showError:false;
    public resetGrid = false;

    constructor(public activeModal: NgbActiveModal,
                public http: HttpClient,
                private stockService:StockService, ) { }

    ngOnInit() {
    }

    closeModal() {
        this.activeModal.close('Modal Closed');
    }


    delete() {
        this.resetMessage();
        this.stockService.delete(  this.stock.id ).then((res: any) => {
         console.log(res);
        }).catch((err) => {
           // this.errorMessage = err['error']['message'];
        });

    }
    resetMessage() {
        this.showError = false;
        this.showMsg = false;
    }

}
