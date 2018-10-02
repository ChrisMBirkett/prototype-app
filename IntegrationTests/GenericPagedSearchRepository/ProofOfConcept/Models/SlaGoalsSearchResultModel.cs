using System;

namespace IntegrationTests.GenericPagedSearchRepository.ProofOfConcept.Models
{
    public class SlaGoalsSearchResultModel
    {
        [Key, Column(Order = 0)]
        public int TableId { get; set; }
        [Key, Column(Order = 1)]
        public int SowMetricId { get; set; }
        public string SowMetricDescription { get; set; }
        public int VendorId { get; set; }
        public string BusinessName { get; set; }
        public int ContractId { get; set; }
        public double Goal { get; set; }
        public double Threshold { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string MasterId { get; set; }
        public string FileTypeId { get; set; }
        public string Service { get; set; }
    }
}