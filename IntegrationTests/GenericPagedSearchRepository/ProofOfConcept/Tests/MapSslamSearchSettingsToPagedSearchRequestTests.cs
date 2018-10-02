using System;
using System.Collections.Generic;
using TestHelpers.DependencyInjection;
using PagedSearchRequestFixture = IntegrationTests.Helpers.Mapper.PagedSearchRequestFixture;
using Parameter = OKC.DLL.VendorManagement.Service.Models.Configurations.Parameter;

namespace IntegrationTests.GenericPagedSearchRepository.ProofOfConcept.Tests
{
    [Collection("Paged Search Settings collection")]
    public class MapSslamSearchSettingsToPagedSearchRequestTests
    {
        protected readonly PagedSearchRequestFixture _fixture;

        public MapSslamSearchSettingsToPagedSearchRequestTests(PagedSearchRequestFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public void SslamPagedSearchSettings_WhenMapped_ResultsInAValidPagedSearchRequest()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                var mappedSearchRequest = Mapper.Map<PagedSearchRequest>(sslamSearchSettings);

                // ASSERT

                Assert.NotNull(mappedSearchRequest);
                Assert.True(mappedSearchRequest.Parameters.Count == 16);
                Assert.True(mappedSearchRequest.ColumnConfigurations.Count == 10);
                Assert.True(!string.IsNullOrWhiteSpace(mappedSearchRequest.SearchStoredProcedure));
                Assert.True(!string.IsNullOrWhiteSpace(mappedSearchRequest.SearchResultSetType));
            }
        }

        [Fact]
        public void SslamPagedSearchSettings_WhenDependencyRequested_ReturnsValidParameters()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                // ASSERT

                // verify that each property of the parameters are populated
                foreach (var parameter in sslamSearchSettings.Parameters)
                {
                    Assert.True(!string.IsNullOrWhiteSpace(parameter.Name), "Parameter name is present");
                    Assert.True(Enum.IsDefined(typeof(DbType), parameter.DbDataType), $"Parameter data type for {parameter.Name} is valid");
                    Assert.True(parameter.IsNullable || parameter.IsNullable == false, $"Parameter for {parameter.Name} IsNullable is set");
                }
            }
        }

        [Fact]
        public void SslamPagedSearchSettings_WhenDependencyRequested_ReturnsValidColumnConfigurations()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                // ASSERT

                // verify that each property of the column configurations are populated
                foreach (var columnConfiguration in sslamSearchSettings.ColumnConfigurations)
                {
                    Assert.True(!string.IsNullOrWhiteSpace(columnConfiguration.ColumnHeader), "Column header is present");
                    Assert.True(!string.IsNullOrWhiteSpace(columnConfiguration.ColumnBinding), $"Column binding for {columnConfiguration.ColumnHeader} is present");
                }
            }
        }

        [Fact]
        public void SslamPagedSearchSettings_WhenManuallyValidated_IsValid()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(sslamSearchSettings, serviceProvider: null, items: null);
                var validationResults = new List<ValidationResult>();

                bool isValid = Validator.TryValidateObject(sslamSearchSettings, validationContext, validationResults, true);

                // ASSERT

                Assert.True(isValid, "Default Sslam search settings are valid.");
            }
        }

        [Fact]
        public void SslamPagedSearchSettings_WhenManuallyValidatedAndIsMissingTheStoredProcedureProperty_IsInvalid()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                sslamSearchSettings.SearchStoredProcedure = "";

                var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(sslamSearchSettings, serviceProvider: null, items: null);
                var validationResults = new List<ValidationResult>();

                bool isValid = Validator.TryValidateObject(sslamSearchSettings, validationContext, validationResults, true);

                // ASSERT

                Assert.False(isValid, "Default Sslam search settings are invalid.");
            }
        }

        [Fact]
        public void SslamPagedSearchSettings_WhenManuallyValidatedAndIsMissingTheParameters_IsInvalid()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                sslamSearchSettings.Parameters = new List<Parameter>();

                var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(sslamSearchSettings, serviceProvider: null, items: null);
                var validationResults = new List<ValidationResult>();

                bool isValid = Validator.TryValidateObject(sslamSearchSettings, validationContext, validationResults, true);

                // ASSERT

                Assert.False(isValid, "Default Sslam search settings are invalid.");
            }
        }
    }
}
