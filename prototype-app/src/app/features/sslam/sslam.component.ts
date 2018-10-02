import { Component, OnInit } from '@angular/core';

import { SslamSearchRequest, SslamService } from './shared';

@Component({
    selector: 'ln-okc-sslam',
    templateUrl: './sslam.component.html'
})
export class SslamComponent implements OnInit {

    constructor(private _sslamService: SslamService) { }

    ngOnInit(): void { }

    onSearch(searchRequest: SslamSearchRequest): void {
        this._sslamService.getPagedSearchResult(searchRequest);
    }
}
