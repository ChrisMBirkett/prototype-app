import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';

import * as _ from 'lodash';

import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.grid';
import * as wjcGridFilter from 'wijmo/wijmo.angular2.grid.filter';
import { FilterType } from 'wijmo/wijmo.grid.filter';

import { PagedSearchResult, ColumnDefinition, FilterDefinitionModel, Column } from '../../../models';

@Component({
  selector: 'ln-paged-search-grid',
  templateUrl: './paged-search-grid.component.html'
})
export class PagedSearchGridComponent implements OnInit, OnChanges {
  
  @Input() pagedSearchResult: PagedSearchResult
  @Input() resetGrid: boolean;

  showGrid: boolean = false;
  totalResults: number;
  currentPage: number;
  totalPages: number;

  gridData: any[];
  selectionMode = 'ListBox';
  gridColumns: ColumnDefinition[] = []; 
  
  filterColumns: string[] = []; 
  defaultFilterType = FilterType.Value;
  filterDefinitionCache: FilterDefinitionModel;

  //@ViewChild('filter') filter: wjcGridFilter.WjFlexGridFilter;
  @ViewChild('grid') flexGrid: wjcGrid.FlexGrid;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.resetGrid) {
      this.showGrid = false;
      // logic to reset grid here
    }
    else if (this.pagedSearchResult) {
      // get the list of columns from the PagedSearchResult object
      this.filterColumns = _.map(this.pagedSearchResult.columns, 'columnId');

      // get the list of column definitions
      this.gridColumns = this.generateGridColumnCollection(this.pagedSearchResult.columns);

      this.gridData = this.pagedSearchResult.searchResults;
      this.totalResults = this.pagedSearchResult.totalResults;
      this.currentPage = this.pagedSearchResult.page;
      this.totalPages = this.pagedSearchResult.totalPages;
      
      this.showGrid = this.pagedSearchResult.searchResults.length > 0;
    } 
  }

  private generateGridColumnCollection(columns: Column[]): ColumnDefinition[] {
    let columnDefinitions: ColumnDefinition[] = [];

    _.forEach(columns, (column) => {
      columnDefinitions.push({ header: column.columnHeader, binding: column.columnId, width: '*', format: column.format });
    });
    
    return columnDefinitions;
  }
}
