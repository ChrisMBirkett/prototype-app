import { Component, OnInit, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';

import { ToastsManager } from 'ng2-toastr';

import { SslamPagedSearchResult, SslamService, SslamSearchRequest, SslamSearchResult } from '../shared';
import { GridSelectionMode } from '../../../shared/enumerations';
import { PagedSearchRequest } from '../../../shared/models';

@Component({
  selector: 'ln-sslam-search-grid',
  templateUrl: './sslam-search-grid.component.html'
})
export class SslamSearchGridComponent implements OnInit {

  @Input() resetGrid: boolean = false;
  @Input() showEditButton: boolean = false;

  @Output() gridSearchRequest = new EventEmitter<PagedSearchRequest>();
  @Output() editRecord = new EventEmitter<SslamSearchResult>();

  pagedSearchResult: SslamPagedSearchResult;
  gridSelectionMode: GridSelectionMode = GridSelectionMode.Row;

  constructor(private _sslamService: SslamService,
    private toastsManager: ToastsManager,
    private vcr: ViewContainerRef) { 
      this.toastsManager.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this._sslamService.sslamPagedSearchResult$.subscribe(
      result => { 
        this.pagedSearchResult = result; 
        this.toastsManager.success('Sslam Paged Search Results returned.');
      },
      error => { 
        console.log('SslamComponent: OnInit...getSslamPagedSearchResult', error) 
        this.toastsManager.error('Sslam Paged Search failed.');
      }
    );
  }

  onGridSearchRequest(request: PagedSearchRequest): void {
    // pass it through to the parent component to do the mapping and make the search request
    this.gridSearchRequest.emit(request);
  }

  onEditRecord(record: SslamSearchResult): void {
    // pass the record to the parent to handle the request
    console.log('SslamGridComponent - onEditRecord', record);
    this.editRecord.emit(record);
  }

}
