import { Component, OnInit } from '@angular/core';

import * as _ from "lodash";

import { SslamSearchRequest, SslamService, SslamSearchResult } from './shared';
import { PagedSearchRequest, ColumnSearchFilter } from '../../shared/models';
import { AuthorizationService } from '../../core/security';
import { Application, Role } from '../../shared/enumerations';

@Component({
    selector: 'ln-okc-sslam',
    templateUrl: './sslam.component.html'
})
export class SslamComponent implements OnInit {

    resetGrid: boolean = false;
    showEditButton: boolean = false;

    private sslamSearchRequest: SslamSearchRequest = null;

    constructor(private sslamService: SslamService,
        private authorizationService: AuthorizationService) { }

    ngOnInit(): void { }

    onSearch(searchRequest: SslamSearchRequest): void {
        this.sslamSearchRequest = searchRequest;
        this.resetGrid = true;
        this.issueSearchRequest();
    }

    onGridSearchRequest(request: PagedSearchRequest): void {
        this.mapRequestIntoSslamSearchRequest(request);
        this.issueSearchRequest();
    }

    onEditRecord(record: SslamSearchResult): void {
        // show the single record editor
        console.log('SslamComponent - onEditRecord', record);
    }

    private issueSearchRequest(): void {
        this.resetGrid = false;
        this.showEditButton = this.authorizationService.user.checkRoleAuthorization(Application.SSLAM, Role.PowerUser)
        this.sslamService.getPagedSearchResult(this.sslamSearchRequest);
    }

    private mapRequestIntoSslamSearchRequest(request: PagedSearchRequest): void {
        this.mapFiltersIntoSslamSearchRequest(request.filters);

        this.sslamSearchRequest.sortBy = request.sortBy;
        this.sslamSearchRequest.sortDirection = request.sortDirection;
        this.sslamSearchRequest.page = request.page;
        this.sslamSearchRequest.pageSize = request.pageSize;
    }

    private mapFiltersIntoSslamSearchRequest(filters: ColumnSearchFilter[]): void {
        this.resetSearchRequestFilters();
        // TODO: (Complexity 22!) Look into object mapping in TS to replace this unsightly switch statement! https://github.com/loedeman/AutoMapper/wiki/Getting-started
        if (filters && filters.length > 0) {
            _.forEach(filters, filter => {
                switch(filter.binding) { 
                    case "vendorId": { 
                        this.sslamSearchRequest.vendorIdFilter = filter.filter; 
                        break; 
                    } 
                    case "contractId": { 
                        this.sslamSearchRequest.contractIdFilter = filter.filter; 
                       break; 
                    } 
                    case "businessName": { 
                        this.sslamSearchRequest.supplierNameFilter = filter.filter; 
                       break; 
                    }
                    case "masterId": { 
                        this.sslamSearchRequest.courtFilter = filter.filter; 
                       break; 
                    }
                    case "fileTypeId": { 
                        this.sslamSearchRequest.fileTypeFilter = filter.filter; 
                       break; 
                    }
                    case "service": { 
                        this.sslamSearchRequest.serviceFilter = filter.filter; 
                       break; 
                    }
                    case "goal": { 
                        this.sslamSearchRequest.goalFilter = filter.filter; 
                       break; 
                    }
                    case "threshold": { 
                        this.sslamSearchRequest.thresholdFilter = filter.filter; 
                       break; 
                    }
                    case "startDate": { 
                        this.sslamSearchRequest.startDateFilter = filter.filter; 
                       break; 
                    }
                    case "endDate": { 
                        this.sslamSearchRequest.endDateFilter = filter.filter; 
                       break; 
                    }
                 } 
            });
        }
    }

    private resetSearchRequestFilters(): void {
        this.sslamSearchRequest.vendorIdFilter = "";
        this.sslamSearchRequest.contractIdFilter = ""; 
        this.sslamSearchRequest.supplierNameFilter = "";
        this.sslamSearchRequest.courtFilter = ""; 
        this.sslamSearchRequest.fileTypeFilter = ""; 
        this.sslamSearchRequest.serviceFilter = ""; 
        this.sslamSearchRequest.goalFilter = ""; 
        this.sslamSearchRequest.thresholdFilter = ""; 
        this.sslamSearchRequest.startDateFilter = ""; 
        this.sslamSearchRequest.endDateFilter = ""; 
    }
}
