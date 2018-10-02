import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule, By } from "@angular/platform-browser";
import { DebugElement, ViewContainerRef } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastOptions, ToastModule } from "ng2-toastr";

import { SslamSearchFormComponent } from "./sslam-search-form.component";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { SslamService } from "../shared/sslam.service";
import { UiHelpersService } from "../../../core/service/shared/ui-helpers.service";
import { MockUiHelpersService } from "../../../test-helpers/mock-ui-helper-service";
import { CustomToastrOption } from "../../../shared/config/toastr-options.config";
import { Observable } from "rxjs";
import {
  SslamSearchRequest,
  SowMetricSearchListModel,
  StateSearchListModel,
  SearchListModel
} from "../shared";
import { PagedSearchDefaults } from "../../../shared/config/paged-search-defaults";

class mockSslamService extends SslamService {
  sslamPagedSearchResult$ = Observable.of(null);
  getPagedSearchResult(searchRequest: SslamSearchRequest): void {}
  getSowMetricSearchList(): Observable<SowMetricSearchListModel[]> {
    return Observable.of([
      { sowMetricId: 1, sowMetricDescription: "test metric" }
    ]);
  }
  getStateSearchListByMetric(
    metricId: string
  ): Observable<StateSearchListModel[]> {
    return Observable.of([{ stateOfService: 'AZ' }]);
  }
  getSearchListsByMetricAndState(
    metricId: string,
    state: string
  ): Observable<SearchListModel> {
    return Observable.of(null);
  }
}

describe("SslamSearchFormComponent", () => {
  let component: SslamSearchFormComponent;
  let fixture: ComponentFixture<SslamSearchFormComponent>;

  let searchEl: DebugElement;
  let sowMetricSelectEl: DebugElement;
  let stateSelectEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SslamSearchFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        ToastModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: SslamService, useClass: mockSslamService },
        { provide: UiHelpersService, useClass: MockUiHelpersService },
        { provide: ToastOptions, useClass: CustomToastrOption },
        ViewContainerRef
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslamSearchFormComponent);
    component = fixture.componentInstance;
    
    component.ngOnInit();

    searchEl = fixture.debugElement.query(By.css('button'));
    sowMetricSelectEl = fixture.debugElement.query(By.css('#sowMetricIdSearchSelect'));
    stateSelectEl = fixture.debugElement.query(By.css('#stateSearchSelect'));
  });

  it("should create", () => {
    component.searchForm.clearValidators();
    expect(component).toBeTruthy();
  });

  describe("#searchForm", () => {
    it("invalid when nothing is selected", () => {
      expect(component.searchForm.valid).toBeFalsy();
    });

    it("should have a valid Form and list of metrics on initialization", () => {
      // ARRANGE

      // ACT
      console.log("should have a valid Form and list of metrics on initialization",component.searchForm);

      // ASSERT
      expect(component.searchForm).toBeTruthy();
      expect(component.searchForm.controls.sowMetricId).toBeTruthy();
      expect(component.searchForm.controls.sowMetricId.validator).toBeTruthy();
      expect(component.searchForm.controls.state).toBeTruthy();
      expect(component.searchForm.controls.state.validator).toBeTruthy();
      expect(component.searchForm.controls.courtType).toBeTruthy();
      expect(component.searchForm.controls.fileTypeId).toBeTruthy();
      expect(component.searchForm.controls.masterId).toBeTruthy();
      expect(component.searchForm.controls.vendorId).toBeTruthy();

      expect(component.metrics.length).toBe(1);
    });

    it("is valid when Sow Mtric and State are selected", () => {
      // ARRANGE
      component.searchForm.controls.sowMetricId.setValue("1");
      component.searchForm.controls.state.setValue("AZ");

      // ASSERT
      expect(component.searchForm.valid).toBe(true);
    });

    it("is invalid when only Sow Metric is selected", () => {
      // ARRANGE
      component.searchForm.clearValidators();
      component.searchForm.controls.sowMetricId.setValue("1");
      component.searchForm.controls.state.setValue(null);

      // ACT
      fixture.detectChanges();

      // ASSERT
      expect(component.searchForm.valid).toBe(false);
    });
  });

  describe("#onSubmit", () => {

    it("button is disabled when form is invalid", () => {

      // TODO: Although this test passes, it is not completely valid as the DOM is not affected by setting the form control values

      // ARRANGE
      component.searchForm.clearValidators();
      component.searchForm.controls.sowMetricId.setValue(null);
      fixture.detectChanges(); // update the component/form state since the SowMetric has been selected
      component.searchForm.controls.state.setValue(null);

      // ACT
      fixture.detectChanges();

      // ASSERT
      expect(searchEl.nativeElement.disabled).toBe(true);       
    });

    it("creates a valid SslamSearchRequest when called and the search Output() emits the event", () => {
      // ARRANGE
      component.searchForm.clearValidators();
      component.searchForm.controls.sowMetricId.setValue("1");
      component.searchForm.controls.state.setValue("AZ");
      component.searchForm.controls.masterId.setValue("123456");
      component.searchForm.controls.courtType.setValue("C");
      component.searchForm.controls.fileTypeId.setValue("CJ");
      component.searchForm.controls.vendorId.setValue(1);

      let searchRequest: SslamSearchRequest;

      component.search.subscribe((value) => { 
        searchRequest = value; 

        // ASSERT
        expect(searchRequest).toBeTruthy();
        expect(searchRequest.sowMetricId).toBe(1);
        expect(searchRequest.state).toBe('AZ');
        expect(searchRequest.masterId).toBe("123456");
        expect(searchRequest.courtType).toBe("C");
        expect(searchRequest.fileTypeId).toBe("CJ");
        expect(searchRequest.vendorId).toBe(1);
        expect(searchRequest.sortBy).toBe(PagedSearchDefaults.sortColumn);
        expect(searchRequest.sortDirection).toBe(PagedSearchDefaults.sortDirection);
        expect(searchRequest.page).toBe(PagedSearchDefaults.page);
        expect(searchRequest.pageSize).toBe(PagedSearchDefaults.pageSize);
      });

      // ACT
      fixture.detectChanges();
      searchEl.triggerEventHandler('click', null); 
    });
  });

  describe("#onSowMetricSelectChanged", () => {
    it("to have been called when the sowMetricIdSearchSelect is changed", () => {
      const sowMetricChangedMock = spyOn(component, 'onSowMetricSelectChanged');
      sowMetricSelectEl.nativeElement.dispatchEvent(new Event('change'));
      
      expect(sowMetricChangedMock).toHaveBeenCalled();
    });
  });

  describe("#onStateSelectChanged", () => {
    it("to have been called when the stateSearchSelect is changed", () => {
      const stateChangedMock = spyOn(component, 'onStateSelectChanged');
      stateSelectEl.nativeElement.dispatchEvent(new Event('change'));
      
      expect(stateChangedMock).toHaveBeenCalled();
    });
  });
});
