import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ToastModule, ToastOptions } from 'ng2-toastr';
import { WjGridModule, WjFlexGrid } from "wijmo/wijmo.angular2.grid";
import { WjGridFilterModule } from "wijmo/wijmo.angular2.grid.filter";
import { WjInputModule } from "wijmo/wijmo.angular2.input";
import * as wjcGrid from "wijmo/wijmo.grid";

import { SslamSearchGridComponent } from './sslam-search-grid.component';
import { PagedSearchModule } from '../../../shared/components/paged-search/paged-search.module';
import { SslamService } from '../shared/sslam.service';
import { UiHelpersService } from '../../../core/service/shared/ui-helpers.service';
import { MockUiHelpersService } from '../../../test-helpers/mock-ui-helper-service';
import { CustomToastrOption } from '../../../shared/config/toastr-options.config';
import { SslamSearchRequest, SowMetricSearchListModel, StateSearchListModel, SearchListModel, SslamPagedSearchResult, SslamSearchResult } from '../shared';
import { Observable } from 'rxjs';
import { PagedSearchFactory } from '../../../test-helpers/paged-search-factory';
import { GridSelectionMode } from '../../../shared/enumerations/paged-search/grid-selection-mode.enum';
import { PagedSearchRequest } from '../../../shared/models/paged-search/paged-search-request';
import { ColumnSearchFilter } from '../../../shared/models/paged-search/column-search-filter';

const mockPagedSearchResult: SslamPagedSearchResult = PagedSearchFactory.getPagedSearchResult();

class mockSslamService extends SslamService {
  sslamPagedSearchResult$ = Observable.of(mockPagedSearchResult);
  getPagedSearchResult(searchRequest: SslamSearchRequest) : void {};
  getSowMetricSearchList(): Observable<SowMetricSearchListModel[]> { return Observable.of(null); };
  getStateSearchListByMetric(metricId: string) : Observable<StateSearchListModel[]> { return Observable.of(null); };
  getSearchListsByMetricAndState(metricId: string, state: string) : Observable<SearchListModel> { return Observable.of(null); };
};

/*
  TODO: To test the child grid, try something like the following:

  Get a reference to the child component:

  let gridDebugComp = gridFixture.debugElement.query(By.directive(PagedSearchGridComponent));
  let gridCompInst = gridFilterDebugComp.componentInstance;

  Now, begin inspecting the DOM as it relates to the child component:
  [SEE THE #WIJMO TESTS IN THE paged-search-grid.component.spec.ts FILE]  
*/

describe('SslamSearchGridComponent', () => {
  let component: SslamSearchGridComponent;
  let fixture: ComponentFixture<SslamSearchGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SslamSearchGridComponent ],
      imports: [
        PagedSearchModule,
        HttpClientTestingModule,
        ToastModule.forRoot()
      ],
      providers: [
        { provide: SslamService, useClass: mockSslamService },
        HttpClient,
        { provide: UiHelpersService, useClass: MockUiHelpersService },
        { provide: ToastOptions, useClass: CustomToastrOption }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslamSearchGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have valid paged search results when the sslam service observable returns a data stream', () => {
    // ARRANGE

    // ACT
    component.ngOnInit();

    // ASSERT
    expect(component.pagedSearchResult).toBeTruthy();
    expect(component.pagedSearchResult.columns.length).toEqual(10);
    expect(component.pagedSearchResult.searchResults.length).toEqual(50);
    expect(component.pagedSearchResult.page).toEqual(1);
    expect(component.pagedSearchResult.pageSize).toEqual(50);
    expect(component.pagedSearchResult.sortBy).toEqual("TableID");
    expect(component.pagedSearchResult.sortDirection).toEqual("ASC");
    expect(component.pagedSearchResult.totalResults).toEqual(1303);
    expect(component.pagedSearchResult.totalPages).toEqual(26);
  });

  it('should set gridSelectionMode member to "Row" selection mode', () => {
    expect(component.gridSelectionMode).toBe(GridSelectionMode.Row);
  });

  describe('#gridSearchRequest', () => {
    it('should emit a search event when onGridSearchRequest is called', () => {
      component.gridSearchRequest.subscribe((value) => { 
        let searchRequest = value; 
        expect(searchRequest).toBeTruthy();
        expect(searchRequest.filters.length).toBe(0);
        expect(searchRequest.sortBy).toBe("TableID");
        expect(searchRequest.sortDirection).toBe("ASC");
        expect(searchRequest.page).toBe(1);
        expect(searchRequest.pageSize).toBe(50);
      });

      const searchRequest: PagedSearchRequest = {
        filters: new Array<ColumnSearchFilter>(),
        sortBy: "TableID",
        sortDirection: "ASC",
        page: 1,
        pageSize: 50
      };
      component.onGridSearchRequest(searchRequest);
    });
  });

  describe('#editRecord', () => {
    it('should emit a search event when onGridSearchRequest is called', () => {
      component.editRecord.subscribe((value) => { 
        let record = value; 
        expect(record).toBeTruthy();
        expect(record.tableId).toBe(1);
        expect(record.goal).toBe(1);
        expect(record.threshold).toBe(1);
      });

      const record: SslamSearchResult = {
        tableId: 1,
        sowMetricId: 1,
        sowMetricDescription: "metric",
        vendorId: 1,
        businessName: "mind your own business",
        contractId: 1,
        goal: 1,
        threshold: 1,
        startDate: "1/1/2017",
        endDate: "12/31/2017",
        masterId: "ABC123",
        fileTypeId: "CJ",
        service: "SPRC"
      };
      component.onEditRecord(record);
    });
  });
});
