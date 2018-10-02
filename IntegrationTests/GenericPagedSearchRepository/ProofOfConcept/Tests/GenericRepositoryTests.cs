using System.Collections.Generic;
using System.Linq;
using IntegrationTests.GenericPagedSearchRepository.ProofOfConcept.Entities;
using TestHelpers.Database;

namespace IntegrationTests.GenericPagedSearchRepository.ProofOfConcept.Tests
{
    [Trait("Category", "Integration")]
    public class GenericRepositoryTests
    {
        [Fact]
        public void GetC3msConnectionString_WhenCalled_WillReturnTheConnectionStringWithTheFullPath()
        {
            Assert.NotEmpty(DbContextHelpers.GetC3msConnectionString());
        }

        [Fact]
        public void SlaMetricDetailsContext_WhenInitialized_ReturnsValidObject()
        {
            // ARRANGE
            var connectionString = DbContextHelpers.GetC3msConnectionString();

            // ACT
            var dbContext = new SlaMetricDetailsContext(connectionString);

            // ASSERT
            Assert.NotNull(dbContext);
        }

        [Fact]
        public void SlaMetricDetailsContext_WhenQueriedForMetrics_ReturnsList()
        {
            // ARRANGE
            var connectionString = DbContextHelpers.GetC3msConnectionString();
            var dbContext = new SlaMetricDetailsContext(connectionString);

            // ACT
            var actual = dbContext.SowMetrics.ToList();

            // ASSERT
            Assert.NotNull(actual);
            Assert.True(actual.Count > 0);
        }

        [Fact]
        public void SlaMetricDetailsContext_WhenQueriedForSearchResults_ReturnsList()
        {
            // ARRANGE
            var connectionString = DbContextHelpers.GetC3msConnectionString();
            var dbContext = new SlaMetricDetailsContext(connectionString);

            // ACT
            var actual = dbContext.SslamTestSearchResults.ToList();

            // ASSERT
            Assert.NotNull(actual);
            Assert.True(actual.Count > 0);
            Assert.True(actual.Count == 1000);
        }

        [Fact]
        public void SlaMetricDetailsContext_WhenPagedSearchRepositoryExtensionUsed_ReturnsMultipleLists()
        {
            // ARRANGE
            var connectionString = DbContextHelpers.GetC3msConnectionString();
            var dbContext = new SlaMetricDetailsContext(connectionString);

            var pagedSearchRequest = new PagedSearchRequest
            {
                SearchStoredProcedure = "dbo.usp_GetSlaGoalsSearchTestData_sel",
                SearchResultSetType = "SslamSearchResultModel",
                Page = 1,
                PageSize = 50,
                SortBy = "ContractID",
                SortDirection = "desc"
            };
            pagedSearchRequest.Parameters.Add(new Parameter("sowMetricID", 5, DbType.Int32, false));
            pagedSearchRequest.Parameters.Add(new Parameter("state", "CA", DbType.String, false));
            pagedSearchRequest.Parameters.Add(new Parameter("masterID", "", DbType.String, false));
            pagedSearchRequest.Parameters.Add(new Parameter("fileTypeID", "", DbType.String, false));
            pagedSearchRequest.Parameters.Add(new Parameter("courtType", "", DbType.String, false));
            pagedSearchRequest.Parameters.Add(new Parameter("vendorID", 0, DbType.Int32, false));
            pagedSearchRequest.Parameters.Add(new Parameter("vendorIdFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("contractIdFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("supplierNameFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("courtFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("fileTypeFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("serviceFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("goalFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("thresholdFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("startDateFilter", null, DbType.String, true));
            pagedSearchRequest.Parameters.Add(new Parameter("endDateFilter", null, DbType.String, true));

            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "vendorId", ColumnHeader = "Vendor", ResultSetType = "VendorModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "contractId", ColumnHeader = "Contract", ResultSetType = "ContractModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "supplierName", ColumnHeader = "Business Name", ResultSetType = "BusinessNameModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "court", ColumnHeader = "Court", ResultSetType = "CourtModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "fileType", ColumnHeader = "File Type", ResultSetType = "FileTypeModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "service", ColumnHeader = "Product", ResultSetType = "ServiceModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "goal", ColumnHeader = "Goal", ResultSetType = "GoalModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "threshold", ColumnHeader = "Threshold", ResultSetType = "ThresholdModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "startDate", ColumnHeader = "Start Date", ResultSetType = "StartDateModel" });
            pagedSearchRequest.ColumnConfigurations.Add(new ColumnConfiguration { ColumnBinding = "endDate", ColumnHeader = "End Date", ResultSetType = "EndDateModel" });

            // ACT
            var actual = dbContext.PagedResults()
                .WithSearchResult<SslamSearchResultModel>()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .WithColumnFilterResult()
                .Search(pagedSearchRequest);

            // ASSERT
            Assert.NotNull(actual);
            Assert.True(actual.TotalResults > 0);
            Assert.True(actual.Page == pagedSearchRequest.Page);
            Assert.True(actual.PageSize == pagedSearchRequest.PageSize);
            Assert.True(actual.SortBy == pagedSearchRequest.SortBy);
            Assert.True(actual.SortDirection == pagedSearchRequest.SortDirection);
            Assert.NotNull(actual.SearchResults);

            var searchResults = actual.SearchResults as IEnumerable<SslamSearchResultModel>;
            Assert.True(searchResults.Count() == 50);

            Assert.True(actual.Columns.Count == 10);
            Assert.True(pagedSearchRequest.ColumnConfigurations.Count == actual.Columns.Count);
            Assert.True(pagedSearchRequest.ColumnConfigurations[0].ColumnBinding == actual.Columns[0].ColumnId);
            Assert.True((actual.Columns[0].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[1].ColumnBinding == actual.Columns[1].ColumnId);
            Assert.True((actual.Columns[1].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[2].ColumnBinding == actual.Columns[2].ColumnId);
            Assert.True((actual.Columns[2].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[3].ColumnBinding == actual.Columns[3].ColumnId);
            Assert.True((actual.Columns[3].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[4].ColumnBinding == actual.Columns[4].ColumnId);
            Assert.True((actual.Columns[4].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[5].ColumnBinding == actual.Columns[5].ColumnId);
            Assert.True((actual.Columns[5].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[6].ColumnBinding == actual.Columns[6].ColumnId);
            Assert.True((actual.Columns[6].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[7].ColumnBinding == actual.Columns[7].ColumnId);
            Assert.True((actual.Columns[7].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[8].ColumnBinding == actual.Columns[8].ColumnId);
            Assert.True((actual.Columns[8].FilterValues as IEnumerable<string>).Any());
            Assert.True(pagedSearchRequest.ColumnConfigurations[9].ColumnBinding == actual.Columns[9].ColumnId);
            Assert.True((actual.Columns[9].FilterValues as IEnumerable<string>).Any());

            var resultsJson = JsonConvert.SerializeObject(actual);
            var deserializedResult = JObject.Parse(resultsJson);
            Assert.True((deserializedResult["SearchResults"] as JArray).Count() == 50);
            Assert.True((deserializedResult["Columns"] as JArray).Count() == 10);
            Assert.True((int)deserializedResult["Page"] == pagedSearchRequest.Page);
            Assert.True((int)deserializedResult["PageSize"] == pagedSearchRequest.PageSize);
            Assert.True((string)deserializedResult["SortBy"] == pagedSearchRequest.SortBy);
            Assert.True((string)deserializedResult["SortDirection"] == pagedSearchRequest.SortDirection);
            Assert.True((int)deserializedResult["TotalResults"] == 1000);
        }
    }
}
