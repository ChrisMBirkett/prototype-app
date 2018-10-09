import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { IEnvironment } from "../../../../environments/environment.interface";
import { SslamService, SslamSearchRequest, SslamPagedSearchResult, SowMetricSearchListModel, StateSearchListModel, SearchListModel } from ".";
import { SslamSearchResult } from "./paged-search-models/sslam-search-result";
import { Column } from "../../../shared/models";
import { UiHelpersService } from "../../../core/service/shared/ui-helpers.service";
import { MockUiHelpersService } from "../../../test-helpers/mock-ui-helper-service";

const mockSslamSearchResults: SslamSearchResult[] = [
  {
    tableId: 160328,
    sowMetricId: 5,
    sowMetricDescription: "SLARecordVolume",
    vendorId: 55,
    businessName: "IN-STATE INVESTIGATIONS, LLC",
    contractId: 72,
    goal: 0,
    threshold: 0.95,
    startDate: "2017-07-12T00:00:00",
    endDate: "2018-07-11T00:00:00",
    masterId: "AZAPAC1   ",
    fileTypeId: "CF",
    service: "BPRC"
  }
];

const mockSslamColumnFilters: Column[] = [
  {
    columnHeader: "Vendor",
    columnId: "vendorId",
    filterValues: ["125", "127", "142", "55"],
    width: 0,
    format: ''
  }
];

const mockPagedSearchResult: SslamPagedSearchResult = {
  searchResults: mockSslamSearchResults,
  columns: mockSslamColumnFilters,
  page: 1,
  pageSize: 50,
  sortBy: "TableID",
  sortDirection: "ASC",
  totalResults: 1303,
  totalPages: 26
};

describe("SslamService", () => {

  let service: SslamService;
  let httpMock: HttpTestingController;

  const testEnv: IEnvironment = {
    production: false,
    name: "DEV",
    version: "1.1",
    wijmoDistributionLicense: "",
    apiUrls: { sslam: "http://localhost:39481/api/sslam/" }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SslamService, 
        { provide: UiHelpersService, useClass: MockUiHelpersService }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(SslamService);
  });

  afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpMock.verify();
    }
  );

    it("should be created", () => {
      expect(service).toBeTruthy();
    });

  describe("#getPagedSearchResult", () => {
    it("should return search results with a valid request", (done) => {
        const searchRequest: SslamSearchRequest = {
          sowMetricId: 5,
          state: "AZ",
          masterId: "",
          fileTypeId: "",
          courtType: "",
          vendorId: 0,
          sortBy: "TableID",
          sortDirection: "ASC",
          page: 1,
          pageSize: 50
        };

        service.getPagedSearchResult(searchRequest);

        service.sslamPagedSearchResult$.subscribe(results => {
          expect(results).toBeTruthy();
          expect(results.searchResults.length).toEqual(1);
          expect(results.columns.length).toEqual(1);
          expect(results.sortBy).toEqual(searchRequest.sortBy);
          expect(results.sortDirection).toEqual(searchRequest.sortDirection);
          expect(results.page).toEqual(searchRequest.page);
          expect(results.pageSize).toEqual(searchRequest.pageSize);
          expect(results.totalResults).toEqual(mockPagedSearchResult.totalResults);
          expect(results.totalPages).toEqual(mockPagedSearchResult.totalPages);
          done();
        });

        const req = httpMock.expectOne(`${testEnv.apiUrls.sslam}search` + `?sowMetricId=5&state=AZ&masterId=&fileTypeId=&courtType=&vendorId=0&sortBy=TableID&sortDirection=ASC&page=1&pageSize=50`);
        expect(req.request.method).toEqual("GET");
        req.flush(mockPagedSearchResult);
      }
    );
  });

  describe("#getSowMetricSearchList", () => {
    it("should return a list of Sow Metrics", (done) => {
        const sowMetrics: SowMetricSearchListModel[] = [
          { sowMetricId: 1, sowMetricDescription: 'test metric' }
        ];

        service.getSowMetricSearchList().subscribe(results => {
          expect(results).toBeTruthy();
          expect(results.length).toEqual(1);
          done();
        });

        const req = httpMock.expectOne(`${testEnv.apiUrls.sslam}getsowmetricsearchlist`);
        expect(req.request.method).toEqual("GET");
        req.flush(sowMetrics);
      }
    );
  });

  describe("#getStateSearchListByMetric", () => {
    it("should return a list of States", (done) => {
        const states: StateSearchListModel[] = [
          { stateOfService: 'test state' }
        ];

        service.getStateSearchListByMetric('5').subscribe(results => {
          expect(results).toBeTruthy();
          expect(results.length).toEqual(1);
          done();
        });

        const req = httpMock.expectOne(`${testEnv.apiUrls.sslam}getstatesearchlistbysowmetric?sowMetricId=5`);
        expect(req.request.method).toEqual("GET");
        req.flush(states);
      }
    );
  });

  describe("#getSearchListsByMetricAndState", () => {
    it("should return a list of lists", (done) => {
        const lists: SearchListModel = 
          { 
            courts: [{ masterId: '12345'}],
            fileTypes: [{fileTypeId: 'CJ', fileTypeName: 'test file type'}],
            courtTypes: [{courtType: 'C', typeDescriptor: 'test court type'}],
            suppliers: [{vendorId: 1, businessName: 'test business'}]
          };

        service.getSearchListsByMetricAndState('5', 'AZ').subscribe(results => {
          expect(results).toBeTruthy();
          expect(results.courts.length).toEqual(1);
          expect(results.fileTypes.length).toEqual(1);
          expect(results.courtTypes.length).toEqual(1);
          expect(results.suppliers.length).toEqual(1);
          done();
        });

        const req = httpMock.expectOne(`${testEnv.apiUrls.sslam}GetSearchListsByMetricAndState?sowMetricId=5&state=AZ`);
        expect(req.request.method).toEqual("GET");
        req.flush(lists);
      }
    );
  });
});
