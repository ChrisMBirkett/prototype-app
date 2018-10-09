import { Component, OnInit, Input } from "@angular/core";
import { SslamSearchResult } from "../shared";


@Component({
    selector:    'ln-sslam-edit-form',
    templateUrl: './sslam-edit-form.component.html'
})
export class SslamEditFormComponent implements OnInit {
    // --- Inputs ---
    @Input() selectedSslamSearchResult: SslamSearchResult;

    // --- Outputs ---

    constructor() { }

    pageTitle: string = 'Edit Goal';

    ngOnInit() {
        this.selectedSslamSearchResult = new SslamSearchResult(
            /* tableId             : number */ 1,
            /* sowMetricId         : number */ 2,
            /* sowMetricDescription: string */ 'KSMTurnTime',
            /* vendorId            : number */ 7,
            /* businessName        : string */ 'ALASKA INFORMATIVE DATA',
            /* contractId          : number */ 37,
            /* goal                : number */ 7,
            /* threshold           : number */ 1,
            /* startDate           : string */ '06/21/2017',
            /* endDate             : string */ '06/20/2018',
            /* masterId            : string */ 'AKALED1',
            /* fileTypeId          : string */ 'FD',
            /* service             : string */ 'Status Check'
        );
    }

    changeReasons(): string[] {
        return ['First Reason','Second Reason','Third Reason','Yet Another Reason','No Reason At All'];
    }

    saveChanges(): void {
        alert('Save the Data!');
    }

    cancelChanges(): void {
        alert('Cancel changes!');
    }
}