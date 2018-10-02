using System.Collections.Generic;
using System.IO;
using TestHelpers.ContextFactory.Abstract;
using Module = Autofac.Module;

namespace TestHelpers.DependencyInjection.Settings
{
    public class CompositionRoot : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            // Set up DI to obtain settings configuration from the settings.json file
            // *This is initially being used to configure the PagedSearchResults implementation
            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetParent(@Directory.GetCurrentDirectory()).Parent.FullName)
                .AddJsonFile("settings.json", optional: false, reloadOnChange: true);

            var configuration = configurationBuilder.Build();

            builder.RegisterOptions();

            // Set up options for SSLAM Paged Search (additional paged search settings go here for assignments, rates...)
            builder.RegisterConfigurationOptions<SslamPagedSearchSettings>(configuration.GetSection("SslamPagedSearchConfiguration"));

            builder.RegisterType<ContextFactory.ContextFactory>()
                .As<IContextFactory>()
                .InstancePerDependency();

            builder.Register(context => context.Resolve<IContextFactory>().GetContext<C3MSEntities>())
                .As<C3MSEntities>()
                .InstancePerDependency();

            builder.Register(context => context.Resolve<IContextFactory>().GetContext<SslamEntities>())
                .As<SslamEntities>()
                .InstancePerDependency();

            // Sslam Queries

            builder.RegisterType<GetStateSearchListBySowMetricQueryHandler>()
                .As<IQueryHandler<GetStateSearchListBySowMetricQuery, IEnumerable<StateSearchListModel>>>()
                .InstancePerDependency();

            builder.RegisterType<GetSowMetricListQueryHandler>()
                .As<IQueryHandler<GetSowMetricListQuery, IEnumerable<SowMetricSearchListModel>>>()
                .InstancePerDependency();

            builder.RegisterType<GetSearchQueryHandler>()
                .As<IQueryHandler<GetSearchQuery, PagedSearchResult>>()
                .InstancePerDependency();

            builder.RegisterType<GetSearchListsByMetricAndStateQueryHandler>()
                .As<IQueryHandler<GetSearchListsByMetricAndStateQuery, SslamSearchListModel>>()
                .InstancePerDependency();

            // Query Dispatcher
            builder.RegisterType<AutofacQueryDispatcher>()
                .As<IQueryDispatcher>()
                .InstancePerDependency();

            // Command Dispatcher
            builder.RegisterType<AutofacCommandDispatcher>()
                .As<ICommandDispatcher>()
                .InstancePerDependency();
        }
    }
}
