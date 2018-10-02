import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ToastModule, ToastOptions } from 'ng2-toastr';

import { SslamSearchGridComponent } from './sslam-search-grid.component';
import { PagedSearchModule } from '../../../shared/components/paged-search/paged-search.module';
import { SslamService } from '../shared/sslam.service';
import { UiHelpersService } from '../../../core/service/shared/ui-helpers.service';
import { MockUiHelpersService } from '../../../test-helpers/mock-ui-helper-service';
import { CustomToastrOption } from '../../../shared/config/toastr-options.config';
import { SslamSearchRequest, SowMetricSearchListModel, StateSearchListModel, SearchListModel, SslamPagedSearchResult } from '../shared';
import { Observable } from 'rxjs';
import { PagedSearchFactory } from '../../../test-helpers/paged-search-factory';

const mockPagedSearchResult: SslamPagedSearchResult = PagedSearchFactory.getPagedSearchResult();

class mockSslamService extends SslamService {
  sslamPagedSearchResult$ = Observable.of(mockPagedSearchResult);
  getPagedSearchResult(searchRequest: SslamSearchRequest) : void {};
  getSowMetricSearchList(): Observable<SowMetricSearchListModel[]> { return Observable.of(null); };
  getStateSearchListByMetric(metricId: string) : Observable<StateSearchListModel[]> { return Observable.of(null); };
  getSearchListsByMetricAndState(metricId: string, state: string) : Observable<SearchListModel> { return Observable.of(null); };
};

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
});
