using System;
using System.Reflection;
using TestHelpers.DependencyInjection;
using TestHelpers.SerachRequests;
using PagedSearchRequestFixture = IntegrationTests.Helpers.Mapper.PagedSearchRequestFixture;

namespace IntegrationTests.GenericPagedSearchRepository.ProofOfConcept.Tests
{
    [Collection("Paged Search Settings collection")]
    public class MapSslamSearchRequestToPagedSearchRequestTests
    {
        protected readonly PagedSearchRequestFixture _fixture;

        public MapSslamSearchRequestToPagedSearchRequestTests(PagedSearchRequestFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public void SslamSearchRequest_WhenMappedToPagedSearchRequest_CorrectlyAssignsSearchParameterValuesToSearchRequestParameterObjects()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();
            var searchRequest = MockSearchRequests.GetGoalsSearchRequestWithSlaRecordVolumeAndStateOfCalifornia();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                var mappedSearchRequest = Mapper.Map<PagedSearchRequest>(sslamSearchSettings);

                // assign searchRequest values to the matching Parameter object Value properties
                MapSearchRequestToPagedSearchRequestParameters.MapSearchRequest(searchRequest, mappedSearchRequest);

                // ASSERT

                foreach (PropertyInfo propertyInfo in searchRequest.GetType().GetProperties())
                {
                    if (propertyInfo.CanRead)
                    {
                        var propertyName = propertyInfo.Name;
                        var pagedSearchParameter = mappedSearchRequest.Parameters.Find(p =>
                            string.Equals(p.Name.ToLower(), propertyName.ToLower()));

                        if (pagedSearchParameter != null)
                        {
                            Assert.True(((IComparable)pagedSearchParameter.Value).CompareTo((IComparable)propertyInfo.GetValue(searchRequest)) == 0, "Search Request value and Paged Search Parameter value match.");
                        }
                    }
                }
            }
        }
    }
}
