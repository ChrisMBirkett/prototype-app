import { SslamSearchResult } from "..";
import { PagedSearchResult, Column } from "../../../../shared/models";

export class SslamPagedSearchResult implements PagedSearchResult {
    constructor(
        public searchResults: SslamSearchResult[],
        public columns: Column[],
        public page: number,
        public pageSize: number,
        public sortBy: string,
        public sortDirection: string,
        public totalResults:number,
        public totalPages: number
    ){}
}