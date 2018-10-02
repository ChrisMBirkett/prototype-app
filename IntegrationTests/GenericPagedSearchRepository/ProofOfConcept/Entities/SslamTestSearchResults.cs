using System;

namespace IntegrationTests.GenericPagedSearchRepository.ProofOfConcept.Entities
{
    [Table("SslamTestSearchResults")]
    public class SslamTestSearchResults
    {
        public int SearchResultsId { get; set; }
        public int SOWMetricID { get; set; }
        public string SOWMetricDescription { get; set; }
        public int VendorId { get; set; }
        public string BusinessName { get; set; }
        public int ContractId { get; set; }

        [Key]
        public int TableId { get; set; }
        public double Goal { get; set; }
        public double Threshold { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string MasterId { get; set; }
        public string FileTypeId { get; set; }
        public string Service { get; set; }
        public string StateOfService { get; set; }
        public string CourtType { get; set; }

    }
}
