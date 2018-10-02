import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Subject, Observable } from 'rxjs'; 
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { environment } from '../../../../environments/environment';
import { UiHelpersService } from '../../../core/service/shared';
import { SowMetricSearchListModel } from './search-models/sow-metric-search-list-model';
import { StateSearchListModel } from './search-models/state-search-list-model';
import { SslamPagedSearchResult } from './paged-search-models/sslam-paged-search-result';
import { SearchListModel } from './search-models/search-list-model';
import { SslamSearchRequest } from './paged-search-models/sslam-search-request';

@Injectable()
export class SslamService {
  private baseUrl = environment.apiUrls.sslam;

  private sslamSearchSubject = new Subject<SslamPagedSearchResult>();

  sslamPagedSearchResult$ = this.sslamSearchSubject.asObservable();

  constructor(private _httpClient: HttpClient, private uiHelpersService: UiHelpersService) { }

  getPagedSearchResult(searchRequest: SslamSearchRequest) : void {

    this.uiHelpersService.showSpinner(); // TODO: Replace this with HttpInterceptor that runs ng-mat spinner on all Http calls

    let searchParameters = new HttpParams();
    Object.keys(searchRequest).forEach((key) => {
      let value = (<any>searchRequest)[key] === null ? '' : (<any>searchRequest)[key];      
      searchParameters = searchParameters.append(key, value);
    });
    this._httpClient
        .get<SslamPagedSearchResult>(`${this.baseUrl}search`, { params: searchParameters })
        .subscribe(
          (result) => {
            this.sslamSearchSubject.next(result);            
          },
          (error) => { this.handleError(error); },
          () => { this.uiHelpersService.hideSpinner(); }
        );
  }

  getSowMetricSearchList(): Observable<SowMetricSearchListModel[]> {
    return this._httpClient
        .get<SowMetricSearchListModel[]>(`${this.baseUrl}getsowmetricsearchlist`);
  }

  getStateSearchListByMetric(metricId: string) : Observable<StateSearchListModel[]> {

    let searchParameters = new HttpParams();
    searchParameters = searchParameters.append('sowMetricId', metricId);

    return this._httpClient
        .get<StateSearchListModel[]>(`${this.baseUrl}getstatesearchlistbysowmetric`, { params: searchParameters });
  }

  getSearchListsByMetricAndState(metricId: string, state: string) : Observable<SearchListModel> {

    let searchParameters = new HttpParams();
    searchParameters = searchParameters.append('sowMetricId', metricId);
    searchParameters = searchParameters.append('state', state);

    return this._httpClient
        .get<SearchListModel>(`${this.baseUrl}GetSearchListsByMetricAndState`, { params: searchParameters });
  }

  private handleError(error: HttpErrorResponse) {
    let returnedError = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      returnedError = 'A client-side or network error occurred: ' + error.error.message;
      console.error(returnedError);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      returnedError = `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
      console.error(returnedError);
    }
    // return an observable with a user-facing error message
    return ErrorObservable.create('Something bad happened; please try again later.<br/><br/>' + returnedError);
  };
}
