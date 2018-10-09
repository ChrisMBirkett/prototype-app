import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WjGridModule } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { WjInputModule } from "wijmo/wijmo.angular2.input";

import { PagedSearchGridComponent } from "./paged-search-grid/paged-search-grid.component";
import { PagerComponent } from "./pager/pager.component";
import { GridColumnsComponent } from "./grid-columns/grid-columns.component";

@NgModule({
  imports: [CommonModule, WjGridModule, WjGridFilterModule, WjInputModule],
  declarations: [
    PagedSearchGridComponent,
    PagerComponent,
    GridColumnsComponent
  ],
  exports: [PagedSearchGridComponent]
})
export class PagedSearchModule {}
