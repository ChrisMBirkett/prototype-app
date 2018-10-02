import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { SslamPagedSearchResult, SslamService } from '../shared';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'ln-sslam-search-grid',
  templateUrl: './sslam-search-grid.component.html'
})
export class SslamSearchGridComponent implements OnInit {

  pagedSearchResult: SslamPagedSearchResult;

  constructor(private _sslamService: SslamService,
    private toastsManager: ToastsManager,
    private vcr: ViewContainerRef) { 
      this.toastsManager.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this._sslamService.sslamPagedSearchResult$.subscribe(
      result => { 
        this.pagedSearchResult = result; 
        console.log('Test Sslam Paged Search Result', result); 
        this.toastsManager.success('Sslam Paged Search Results returned.');
      },
      error => { 
        console.log('SslamComponent: OnInit...getSslamPagedSearchResult', error) 
        this.toastsManager.error('Sslam Paged Search failed.');
      }
  );
  }

}
