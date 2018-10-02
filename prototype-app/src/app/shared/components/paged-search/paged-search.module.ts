import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WjGridModule }         from 'wijmo/wijmo.angular2.grid';
import { WjGridFilterModule }   from 'wijmo/wijmo.angular2.grid.filter';
import { WjInputModule }        from 'wijmo/wijmo.angular2.input';

import { PagedSearchGridComponent } from './paged-search-grid/paged-search-grid.component';

@NgModule({
  imports: [
    CommonModule,
    WjGridModule,
    WjGridFilterModule,
    WjInputModule
  ],
  declarations: [PagedSearchGridComponent],
  exports: [PagedSearchGridComponent]
})
export class PagedSearchModule { }
