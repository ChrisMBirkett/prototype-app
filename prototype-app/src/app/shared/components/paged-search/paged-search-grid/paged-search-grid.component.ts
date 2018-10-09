import { Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter, SimpleChanges } from "@angular/core";

import * as _ from "lodash";

import * as wjcGrid from "wijmo/wijmo.grid";
import { FilterType } from 'wijmo/wijmo.grid.filter';
import * as wjcGridFilter from "wijmo/wijmo.angular2.grid.filter";

import {
  PagedSearchResult,
  PagedSearchRequest,
  ColumnSearchFilter,
  FilterDefinitionModel,
  Column,
  ColumnDefinition
} from "../../../models";
import { PagedSearchDefaults } from "../../../config/paged-search-defaults";
import { GridSelectionMode } from "../../../enumerations";

@Component({
  selector: "ln-paged-search-grid",
  templateUrl: "./paged-search-grid.component.html"
})
export class PagedSearchGridComponent implements OnInit, OnChanges {

  @Input() pagedSearchResult: PagedSearchResult;
  @Input() resetGrid: boolean = false;
  @Input() showEditButton: boolean = false;
  @Input() enableBulkEdit: boolean = false; // TODO: This is stubbed for future use since not all applications will use the multiselect feature to edit
  @Input() selectionMode: GridSelectionMode = GridSelectionMode.Row;

  @Output() gridSearchRequest = new EventEmitter<PagedSearchRequest>();
  @Output() editRecord = new EventEmitter<any>();

  showGrid: boolean = false;
  gridSectionHeight: string = "0"; // used to control the height of the grid section DOM element
  totalResults: number;
  currentPage: number;
  totalPages: number;

  gridData: any[];

  filterColumns: string[] = [];
  columns: Column[] = new Array<Column>();
  gridColumns: ColumnDefinition[] = [];

  sortColumn: string = PagedSearchDefaults.sortColumn;
  sortDirection: string = PagedSearchDefaults.sortDirection;

  @ViewChild("grid") flexGrid: wjcGrid.FlexGrid;

  defaultFilterType = FilterType.Value;
  filterDefinitionCache: FilterDefinitionModel;

  @ViewChild("filter") filter: wjcGridFilter.WjFlexGridFilter;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.resetGrid && changes.resetGrid.currentValue) {
      this.showGrid = false;
      this.resetGridSettingsToDefaults();
    } 
    if (changes.pagedSearchResult && changes.pagedSearchResult.currentValue) {
      this.showGrid = this.pagedSearchResult.searchResults.length > 0;
      this.setupAndConfigurGrid();     
    }
  }

  onFormatItem(e: wjcGrid.FormatItemEventArgs): void {
    e.cancel = true;

    // need to manually control the sort icon since sorting is being overridden
    const panel = e.panel;
    if (panel.cellType == wjcGrid.CellType.ColumnHeader) {
      const column = panel.columns[e.col];
      if (this.sortColumn == column.binding) {
        if (this.sortDirection == "ASC") {
          e.cell.innerHTML = column.header + ' <span class="wj-glyph-up"></span>';
        } else {
          e.cell.innerHTML = column.header + ' <span class="wj-glyph-down"></span>';
        }
      }
    }
  }

  onSortedColumn(e: wjcGrid.CellRangeEventArgs) {
    e.cancel = true;

    if (this.filterColumns[e.col] !== this.sortColumn) {
      this.sortColumn = this.filterColumns[e.col];
      this.sortDirection = "ASC";
    } else {
      this.sortDirection = "DESC";
    }

    this.issueSearchRequest();
  }

  onFilterChanged(e: wjcGrid.CellRangeEventArgs) {
    // any time a filter request is made, set the current page back to 1
    this.currentPage = 1;

    // cache the current filter as a typed JSON object
    this.filterDefinitionCache = JSON.parse(this.filter.filterDefinition);

    // cancel the event as we are going to issue a new search request
    if (e.cancel !== true) {
      e.cancel = true;

      this.issueSearchRequest();
    }
  }

  editRow(record: any): void {
    // emit single record edit event
    console.log('PagedSearchGrid - editRow', record);
    this.editRecord.emit(record);
  }

  editRows() {
    const records = this.flexGrid.selectedItems;
    // emit multi record edit event
  }

  isMultipleRecordsSelected(): boolean {
    return this.flexGrid.selectedItems.length > 1;
  }

  onPageRequest(pageRequested: number): void {
    this.currentPage = pageRequested;

    this.issueSearchRequest();
  }

  private setupAndConfigurGrid(): void {
    if (this.showGrid) {
      setTimeout(() => {
        // get the list of column definitions
        this.filterColumns = _.map(this.pagedSearchResult.columns, "columnId");         
      }, 0);

      this.gridData = this.pagedSearchResult.searchResults;
      
      // set up the Value Filters for each column
      setTimeout(() => {
        this.setUpValueFilters();
      }, 100);

      this.totalResults = this.pagedSearchResult.totalResults;
      this.currentPage = this.pagedSearchResult.page;
      this.totalPages = this.pagedSearchResult.totalPages;
      
      this.gridSectionHeight = "500px";
    } else {
      // change the #flexGridSection section of the page to 0 height
      this.gridSectionHeight = "0";
    }
  }

  private issueSearchRequest(): void {
    // set up search request, emit search request event
    this.gridSearchRequest.emit(this.createSearchRequest());
  }

  private resetGridSettingsToDefaults(): void {
    this.sortColumn = PagedSearchDefaults.sortColumn;
    this.sortDirection = PagedSearchDefaults.sortDirection;

    this.filterDefinitionCache = null;
  }

  private createSearchRequest(): PagedSearchRequest {
    return {
      filters: this.getBindingFilters(),
      sortBy: this.sortColumn,
      sortDirection: this.sortDirection,
      page: this.currentPage,
      pageSize: PagedSearchDefaults.pageSize
    }
  }

  private getBindingFilters(): ColumnSearchFilter[] {
    const filters: ColumnSearchFilter[] = new Array<ColumnSearchFilter>();    

    if (this.filterDefinitionCache && this.filterDefinitionCache.filters) {
      _.forEach(this.filterDefinitionCache.filters, filter => {
        if (filter.showValues) {
          const values = ';' + Object.keys(filter.showValues).join(';') + ';';
          filters.push({ binding: filter.binding, filter: values });
        }
      });
    }

    return filters;
  }

  private setUpValueFilters(): void {
    _.forEach(this.filterColumns, column => {
      const foundFilterList = _.find(this.pagedSearchResult.columns, (col) => { return col.columnId === column; });
      const filterValues = foundFilterList.filterValues;
      this.filter.getColumnFilter(column).valueFilter.uniqueValues = filterValues;
    });
  }
}
