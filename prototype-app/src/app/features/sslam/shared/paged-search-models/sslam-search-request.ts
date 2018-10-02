export interface SslamSearchRequest {
  sowMetricId: number;
  state: string;
  masterId: string;
  fileTypeId: string;
  courtType: string;
  vendorId: number;
  vendorIdFilter?: string;
  contractIdFilter?: string;
  supplierNameFilter?: string;
  courtFilter?: string;
  fileTypeFilter?: string;
  serviceFilter?: string;
  goalFilter?: string;
  thresholdFilter?: string;
  startDateFilter?: string;
  endDateFilter?: string;
  sortBy: string;
  sortDirection: string;
  page: number;
  pageSize: number;
}
