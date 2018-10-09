import { ColumnSearchFilter } from "./column-search-filter";

export interface PagedSearchRequest {
  filters: ColumnSearchFilter[],
  sortBy: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}
