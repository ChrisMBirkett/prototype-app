namespace prototype_app.Models.Sslam
{
    public class SslamSearchResultModel
    {
        public int TableId { get; set; }
        public int SowMetricId { get; set; }
        public string SowMetricDescription { get; set; }
        public int VendorId { get; set; }
        public string BusinessName { get; set; }
        public int ContractId { get; set; }
        public double Goal { get; set; }
        public double Threshold { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string MasterId { get; set; }
        public string FileTypeId { get; set; }
        public string Service { get; set; }
    }
}