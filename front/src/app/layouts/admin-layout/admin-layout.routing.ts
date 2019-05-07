import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/dashboard/user-profile/user-profile.component';
import { TableListComponent } from '../../pages/dashboard/table-list/table-list.component';
import { TypographyComponent } from '../../pages/dashboard/typography/typography.component';
import { IconsComponent } from '../../pages/dashboard/icons/icons.component';
import { MapsComponent } from '../../pages/dashboard/maps/maps.component';
import { NotificationsComponent } from '../../pages/dashboard/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/dashboard/upgrade/upgrade.component';
import {TaskComponent} from '../../pages/dashboard/task/view/task.component';
import {ViewstockComponent} from '../../pages/dashboard/stock/view/viewstock.component';


export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'stock',  component: ViewstockComponent },
    { path: 'task',  component: TaskComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
