export class SslamSearchResult {
    constructor(
        public tableId: number,
        public sowMetricId: number,
        public sowMetricDescription: string,
        public vendorId: number,
        public businessName: string,
        public contractId: number,
        public goal: number,
        public threshold: number,
        public startDate: string,
        public endDate: string,
        public masterId: string,
        public fileTypeId: string,
        public service: string
      ) { }
}