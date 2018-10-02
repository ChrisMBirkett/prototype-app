namespace TestHelpers.SerachRequests
{
    public static class MockSearchRequests
    {
        public static SslamSearchRequest GetGoalsSearchRequestWithSlaRecordVolumeAndStateOfCalifornia() => new SslamSearchRequest
        {
            SowMetricId = 5,
            State = "CA",
            MasterId = "",
            FileTypeId = "",
            CourtType = "",
            VendorId = 0,
            VendorIdFilter = "",
            ContractIdFilter = "",
            SupplierNameFilter = "",
            CourtFilter = "",
            FileTypeFilter = "",
            ServiceFilter = "",
            GoalFilter = "",
            ThresholdFilter = "",
            StartDateFilter = "",
            EndDateFilter = "",
            SortBy = "TableID",
            SortDirection = "ASC",
            Page = 1,
            PageSize = 50
        };
    }
}
