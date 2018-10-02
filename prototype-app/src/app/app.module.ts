
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'; // TODO: Remove this once all usage of 'http' has been replaced with 'httpClient'
import { RouterModule } from '@angular/router';

import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { Logger } from './core/service/shared';
import { AssignmentsModule } from './features/assignments/assignments.module';
import { HomeModule } from './features/home/home.module';
import { VendorRatesModule } from './features/vendor-rates/vendor-rates.module';
import { FooterComponent } from './features/footer/footer.component';
import { AuthorizationService } from './core/security/authorization.service';
import { SslamModule } from './features/sslam/sslam.module';
import { PagedSearchModule } from './shared/components/paged-search/paged-search.module';
import { CustomToastrOption } from './shared/config/toastr-options.config';
import { AssignmentsGuard, VendorRatesGuard } from './core/security';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SslamModule,
    HomeModule,
    AppRoutingModule,
    RouterModule.forRoot([], { useHash: true }),
    HttpClientModule,
    HttpModule, // TODO: Remove this once all usage of 'http' has been replaced with 'httpClient'
    VendorRatesModule,
    AssignmentsModule,
    PagedSearchModule,
    ToastModule.forRoot()
  ],
  providers: [
    Logger,
    AuthorizationService,
    { provide: ToastOptions, useClass: CustomToastrOption },
    AssignmentsGuard,
    VendorRatesGuard
  ],
  bootstrap: [AppComponent, []]
})
export class AppModule { }
