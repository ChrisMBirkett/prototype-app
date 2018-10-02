namespace IntegrationTests.GenericPagedSearchRepository.ProofOfConcept.Entities
{
    public class SlaMetricDetailsContext : DbContext
    {
        public SlaMetricDetailsContext(string connectionString)
            : base(connectionString)
        {
        }

        public DbSet<SowMetric> SowMetrics { get; set; }
        public DbSet<SslamTestSearchResults> SslamTestSearchResults { get; set; }
    }
}