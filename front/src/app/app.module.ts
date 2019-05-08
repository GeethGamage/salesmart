import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/dashboard/user-profile/user-profile.component';
import { TableListComponent } from './pages/dashboard/table-list/table-list.component';
import { TypographyComponent } from './pages/dashboard/typography/typography.component';
import { IconsComponent } from './pages/dashboard/icons/icons.component';
import { MapsComponent } from './pages/dashboard/maps/maps.component';
import { NotificationsComponent } from './pages/dashboard/notifications/notifications.component';
import { UpgradeComponent } from './pages/dashboard/upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
      HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }