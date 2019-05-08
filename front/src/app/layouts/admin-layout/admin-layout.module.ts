import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from '../../pages/dashboard/dashboard/dashboard.component';
import {UserProfileComponent} from '../../pages/dashboard/user-profile/user-profile.component';
import {TableListComponent} from '../../pages/dashboard/table-list/table-list.component';
import {TypographyComponent} from '../../pages/dashboard/typography/typography.component';
import {IconsComponent} from '../../pages/dashboard/icons/icons.component';
import {MapsComponent} from '../../pages/dashboard/maps/maps.component';
import {NotificationsComponent} from '../../pages/dashboard/notifications/notifications.component';
import {UpgradeComponent} from '../../pages/dashboard/upgrade/upgrade.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule, MatTooltipModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from '../../services/task/api.service';
import {TaskdeleteComponent} from '../../pages/dashboard/task/delete/taskdelete.component';
import {TaskinsertComponent} from '../../pages/dashboard/task/insert/taskinsert.component';
import {TaskupdateComponent} from '../../pages/dashboard/task/update/taskupdate.component';
import {TaskComponent} from '../../pages/dashboard/task/view/task.component';
import {InsertstockComponent} from '../../pages/dashboard/stock/insert/insertstock.component';
import {ViewstockComponent} from '../../pages/dashboard/stock/view/viewstock.component';
import {UpdatestockComponent} from '../../pages/dashboard/stock/update/updatestock.component';
import {DeletestockComponent} from '../../pages/dashboard/stock/delete/deletestock.component';
import {AdminLayoutRoutingModule} from './admin-layout-routing.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutingModule),
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        HttpClientModule,
        ReactiveFormsModule,
        DataTablesModule,
        NgbModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        TaskComponent,
        TaskinsertComponent,
        TaskdeleteComponent,
        TaskupdateComponent,
        ViewstockComponent,
        InsertstockComponent,
        DeletestockComponent,
        UpdatestockComponent

    ],
    providers: [ApiService,
        NgbActiveModal],
    entryComponents: [TaskinsertComponent,
        TaskdeleteComponent,
        TaskupdateComponent,
        InsertstockComponent,
        DeletestockComponent,
        UpdatestockComponent
    ]
})

export class AdminLayoutModule {
}