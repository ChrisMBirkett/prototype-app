using System;
using System.Collections.Generic;
using TestHelpers.DependencyInjection;

namespace IntegrationTests.Settings
{
    public class PagedSearchSettingsTests
    {
        [Fact]
        public void SlaMetricSearchSettings_WhenDependencyRequested_ReturnsAValidObject()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                // ASSERT
                Assert.NotNull(sslamSearchSettings);
                Assert.True(sslamSearchSettings.Parameters.Count == 16);
                Assert.True(sslamSearchSettings.ColumnConfigurations.Count == 10);
                Assert.True(!string.IsNullOrWhiteSpace(sslamSearchSettings.SearchStoredProcedure));
                Assert.True(!string.IsNullOrWhiteSpace(sslamSearchSettings.SearchResultSetType));

                // Validate the Sslam Search Settings model
                var context = new ValidationContext(sslamSearchSettings, serviceProvider: null, items: null);
                var validationResults = new List<ValidationResult>();

                bool isValid = Validator.TryValidateObject(sslamSearchSettings, context, validationResults, true);
                Assert.True(isValid, "Sslam Settings are valid");
            }
        }

        [Fact]
        public void SlaMetricSearchSettings_WhenDependencyRequestedAndDataAnnotationValidated_ReturnsValidSettings()
        {
            // ARRANGE
            var settingsContainer = DIOptionsHelper.SetupOptionsContainerBuilder();

            // ACT
            using (var scope = settingsContainer.BeginLifetimeScope())
            {
                var optionsSnapshot = scope.Resolve<IOptions<SslamPagedSearchSettings>>();
                var sslamSearchSettings = optionsSnapshot.Value;

                // ASSERT

                // Validate the Sslam Search Settings model
                var context = new ValidationContext(sslamSearchSettings, serviceProvider: null, items: null);
                var validationResults = new List<ValidationResult>();

                bool isValid = Validator.TryValidateObject(sslamSearchSettings, context, validationResults, true);
                Assert.True(isValid, "Sslam Settings are valid");
            }
        }

        [Fact]
        public void SlaMetricSearchSettings_WhenDependencyRequested_ReturnsValidParameters()
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
        public void SlaMetricSearchSettings_WhenDependencyRequested_ReturnsValidColumnConfigurations()
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
    }
}
