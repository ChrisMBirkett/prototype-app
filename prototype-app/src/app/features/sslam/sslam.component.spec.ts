import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SslamComponent } from './sslam.component';
import { UiHelpersService } from '../../core/service/shared';
import { SslamService, SslamSearchRequest, SslamSearchResult } from './shared';
import { MockUiHelpersService } from '../../test-helpers';
import { AuthorizationService } from '../../core/security';
import { UserModel, UserRole, PagedSearchRequest, ColumnSearchFilter } from '../../shared/models';
import { Application, Role } from '../../shared/enumerations';

const mockUserRoles = [new UserRole(Application.SSLAM, Role.PowerUser)];

class mockAuthorizationService extends AuthorizationService {
  user: UserModel = new UserModel("Biff Tannen", mockUserRoles)
}

const mockSearchRequest: SslamSearchRequest = {
  sowMetricId: 1,
  state: 'AZ',
  masterId: '',
  fileTypeId: '',
  courtType: '',
  vendorId: 0,
  sortBy: 'TableID',
  sortDirection: 'ASC',
  page: 1,
  pageSize: 50
};

describe('SslamComponent', () => {

  let component: SslamComponent;
  let fixture: ComponentFixture<SslamComponent>;
  let debugElement: DebugElement;

  let sslamService: SslamService;
  let sslamServiceSpy;
  let authorizationService: AuthorizationService;
  let authorizationServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SslamComponent],
      imports: [HttpClientTestingModule],
      providers: [
        SslamService, 
        { provide: UiHelpersService, useClass: MockUiHelpersService },
        HttpClient,        
        { provide: AuthorizationService, useClass: mockAuthorizationService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslamComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    sslamService = debugElement.injector.get(SslamService);
    sslamServiceSpy = spyOn(sslamService, 'getPagedSearchResult');
    authorizationService = debugElement.injector.get(AuthorizationService);

    fixture.detectChanges();    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSearch', () => {
    it('should issue a search request to SslamService when called', () => {
      component.onSearch(mockSearchRequest);

      expect(sslamServiceSpy).toHaveBeenCalled();
      expect(component.resetGrid).toBe(false);
    });

    it('should set showEditButton to true when called with at least SSLAM PowerUser when called', () => {
      component.onSearch(mockSearchRequest);

      expect(sslamServiceSpy).toHaveBeenCalled();
      expect(component.showEditButton).toBe(true);
    });
  });

  it('#onGridSearchRequest should issue a grid search request when called', () => {

    component.onSearch(mockSearchRequest);
    fixture.detectChanges();

    const mockPagedSearchRequest: PagedSearchRequest = {
      filters: new Array<ColumnSearchFilter>(),
      sortBy: "TableID",
      sortDirection: "ASC",
      page: 1,
      pageSize: 50
    };
    component.onGridSearchRequest(mockPagedSearchRequest);

    expect(sslamServiceSpy).toHaveBeenCalled();
    expect(component.resetGrid).toBe(false);
    expect(component.showEditButton).toBe(true);
  });
  
  it('#onEditRecord should issue a single record edit request when called', () => {
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

    const componentOnEditRecordSpy = spyOn(component, 'onEditRecord');

    component.onEditRecord(record);

    expect(componentOnEditRecordSpy).toHaveBeenCalled();
  });
});
