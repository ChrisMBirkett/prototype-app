using prototype_app.Models.PagedSearch.Abstract;

namespace prototype_app.Models.Sslam
{
    public class SslamSearchRequest : BaseSearchRequest
    {
        public int SowMetricId { get; set; }
        public string State { get; set; }
        public string MasterId { get; set; }
        public string FileTypeId { get; set; }
        public string CourtType { get; set; }
        public int VendorId { get; set; }
        public string VendorIdFilter { get; set; }
        public string ContractIdFilter { get; set; }
        public string SupplierNameFilter { get; set; }
        public string CourtFilter { get; set; }
        public string FileTypeFilter { get; set; }
        public string ServiceFilter { get; set; }
        public string GoalFilter { get; set; }
        public string ThresholdFilter { get; set; }
        public string StartDateFilter { get; set; }
        public string EndDateFilter { get; set; }
    }
}
