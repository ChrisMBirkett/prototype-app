import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WjGridModule }         from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule }   from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule }        from 'wijmo/wijmo.angular2.input';

import { UiHelpersService }     from '../../core/service/shared';
import { SslamComponent }       from './sslam.component';
import { SslamRoutingModule }   from './sslam.routing';
import { SslamService } from './shared';
import { SslamSearchGridComponent } from './sslam-search-grid/sslam-search-grid.component';
import { UiHelpersModule } from '../../shared/components/ui-helpers/ui-helpers.module';
import { PagedSearchModule } from '../../shared/components/paged-search/paged-search.module';
import { SslamSearchFormComponent } from './sslam-search-form/sslam-search-form.component';
import { SslamEditFormComponent } from './sslam-edit-form/sslam-edit-form.component';

@NgModule({
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        SslamRoutingModule, 
        UiHelpersModule,
        WjGridModule, 
        WjInputModule, 
        WjGridFilterModule,
        PagedSearchModule
    ],
    exports: [SslamComponent],
    declarations: [
        SslamComponent,
        SslamSearchGridComponent,
        SslamSearchFormComponent,
        SslamEditFormComponent,
    ],
    providers: [
        SslamService, 
        UiHelpersService
    ],
})
export class SslamModule { }
