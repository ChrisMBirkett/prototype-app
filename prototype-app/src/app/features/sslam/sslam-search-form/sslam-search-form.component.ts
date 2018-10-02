import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import { ToastsManager } from "ng2-toastr";

import { SslamSearchRequest, SslamService } from "../shared";
import { SowMetricSearchListModel } from "../shared/search-models/sow-metric-search-list-model";
import { StateSearchListModel } from "../shared/search-models/state-search-list-model";
import { SearchListModel } from "../shared/search-models/search-list-model";
import { PagedSearchDefaults } from "../../../shared/config/paged-search-defaults";
import { UiHelpersService, StringHelpers } from "../../../core/service/shared";

@Component({
  selector: "ln-sslam-search-form",
  templateUrl: "./sslam-search-form.component.html"
})
export class SslamSearchFormComponent implements OnInit {
  @Output()
  search = new EventEmitter<SslamSearchRequest>();

  searchForm: FormGroup;

  metrics: SowMetricSearchListModel[];
  states: StateSearchListModel[];
  searchLists: SearchListModel;

  constructor(
    private formBuilder: FormBuilder,
    private sslamService: SslamService,
    private uiHelpersService: UiHelpersService,
    private toastManager: ToastsManager,
    private vcr: ViewContainerRef) { 
      this.toastManager.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      sowMetricId: new FormControl(null, [Validators.required]), 
      state: new FormControl({ value: null, disabled: true }, [Validators.required]),
      masterId: new FormControl({ value: null, disabled: true }),
      fileTypeId: new FormControl({ value: null, disabled: true }),
      courtType: new FormControl({ value: null, disabled: true }),
      vendorId: new FormControl({ value: null, disabled: true })
    });

    console.log('searchForm initial state', this.searchForm);

    this.uiHelpersService.showSpinner();

    this.sslamService.getSowMetricSearchList().subscribe(
      list => {
        this.metrics = list;
        this.toastManager.success('SOW Metric search list loaded.');
      },
      error => {
        console.log(error);
        this.toastManager.error(
          "The call to get the list of SOW Metric IDs has failed."
        );
      },
      () => {
        this.uiHelpersService.hideSpinner();
      }
    );
  }

  onSubmit(): void {
    const searchRequest = this.setUpSearchRequest();

    this.issueSearchRequest(searchRequest);
  }

  onSowMetricSelectChanged(metricId: string): void {
    this.disableStatehDropDown();
    this.disableSearchDropDowns();

    if (!StringHelpers.isNullOrWhiteSpace(metricId)) {
      this.uiHelpersService.showSpinner();

      this.sslamService
        .getStateSearchListByMetric(metricId)
        .subscribe(
          states => { 
            this.enableStateDropDown();
            this.states = states; 
            this.toastManager.success('States search list loaded.');
          }, 
          error => {
            console.log(error);
            this.toastManager.error("The call to get the list of States has failed.");}, 
          () => { this.uiHelpersService.hideSpinner(); }
        );
    }
  }

  onStateSelectChanged(state: string): void {
    this.disableSearchDropDowns();

    const formModel = this.searchForm.value;
    if (!StringHelpers.isNullOrWhiteSpace(formModel.sowMetricId) && !StringHelpers.isNullOrWhiteSpace(state)) {

      this.uiHelpersService.showSpinner();

      this.sslamService
        .getSearchListsByMetricAndState(formModel.sowMetricId, state)
        .subscribe(
          lists => {
            this.enableSearchDropDowns();
            this.searchLists = lists;
            this.toastManager.success('Search lists loaded.');
          }, 
          error => {
            console.log(error);
            this.toastManager.error("The call to get the search lists has failed.");}, 
          () => { this.uiHelpersService.hideSpinner(); }
        );
    }
  }

  private disableStatehDropDown(): void {
    this.searchForm.controls.state.setValue(null);
    this.searchForm.controls.state.reset();
    this.searchForm.controls.state.disable();
  }

  private enableStateDropDown(): void {
    this.searchForm.controls.state.enable();
  }

  private disableSearchDropDowns(): void {
    this.searchForm.controls.masterId.setValue(null);
    this.searchForm.controls.masterId.reset();
    this.searchForm.controls.masterId.disable();
    this.searchForm.controls.fileTypeId.setValue(null);
    this.searchForm.controls.fileTypeId.reset();
    this.searchForm.controls.fileTypeId.disable();
    this.searchForm.controls.courtType.setValue(null);
    this.searchForm.controls.courtType.reset();
    this.searchForm.controls.courtType.disable();
    this.searchForm.controls.vendorId.setValue(null);
    this.searchForm.controls.vendorId.reset();
    this.searchForm.controls.vendorId.disable();
  }

  private enableSearchDropDowns(): void {
    this.searchForm.controls.masterId.enable();
    this.searchForm.controls.fileTypeId.enable();
    this.searchForm.controls.courtType.enable();
    this.searchForm.controls.vendorId.enable();
  }

  private setUpSearchRequest(): SslamSearchRequest {
    const formModel = this.searchForm.value;

    return {
      sowMetricId: formModel.sowMetricId,
      state: formModel.state,
      masterId: formModel.masterId,
      fileTypeId: formModel.fileTypeId,
      courtType: formModel.courtType,
      vendorId: formModel.vendorId,
      sortBy: PagedSearchDefaults.sortColumn,
      sortDirection: PagedSearchDefaults.sortDirection,
      page: PagedSearchDefaults.page,
      pageSize: PagedSearchDefaults.pageSize
    };
  }

  private issueSearchRequest(searchRequest: SslamSearchRequest): void {
    this.search.emit(searchRequest);
  }
}
