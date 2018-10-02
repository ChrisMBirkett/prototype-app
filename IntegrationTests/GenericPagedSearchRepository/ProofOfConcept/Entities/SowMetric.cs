namespace IntegrationTests.GenericPagedSearchRepository.ProofOfConcept.Entities
{
    [Table("SOWMetrics")]
    public class SowMetric
    {
        [Column("SOWMetricID")]
        [Key]
        public int SowMetricId { get; set; }

        [Column("SOWMetricDescription")]
        public string SowMetricDescription { get; set; }
    }
}