import { Column } from "./column";

export interface PagedSearchResult {
    searchResults: Array<any>;
    columns: Column[];
    page: number;
    pageSize: number;
    sortBy: string;
    sortDirection: string;
    totalResults:number;
    totalPages: number;
}