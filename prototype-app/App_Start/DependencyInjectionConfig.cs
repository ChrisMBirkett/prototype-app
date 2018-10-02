using System.Collections.Generic;
using System.Reflection;
using prototype_app.Data.ContextFactory;
using prototype_app.Data.ContextFactory.Abstract;
using prototype_app.Domain;
using prototype_app.Domain.Abstract;
using prototype_app.Domain.Sslam.Query;
using prototype_app.Models.PagedSearch;
using prototype_app.Models.Sslam;
using prototype_app.Service;
using prototype_app.Service.Abstract;
using prototype_app.Service.Models;
using CourtAssignmentModel = OKC.DLL.VendorManagement.Models.C3MS.Assignments.CourtAssignmentModel;
using VendorModel = OKC.DLL.VendorManagement.Models.C3MS.Assignments.VendorModel;

namespace prototype_app
{
    public class DependencyInjectionConfig
    {
        public static void RegisterDependencies()
        {
            // Set up DI to obtain settings configuration from the settings.json file
            // *This is initially being used to configure the PagedSearchResults implementation
            var configurationBuilder = new ConfigurationBuilder()
                .AddJsonFile("settings.json", optional: false, reloadOnChange: true);

            var configuration = configurationBuilder.Build();

            var builder = new ContainerBuilder();
            builder.RegisterOptions();

            // Set up options for SSLAM Paged Search (additional paged search settings go here for assignments, rates...)
            builder.RegisterConfigurationOptions<SslamPagedSearchSettings>(configuration.GetSection("SslamPagedSearchConfiguration"));

            // Controllers
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Services
            builder.RegisterType<VendorRateService>().As<IVendorRateService>().InstancePerRequest();
            builder.RegisterType<AssignmentsService>().As<IAssignmentsService>().InstancePerRequest();
            builder.RegisterType<SecurityService>().As<ISecurityService>().InstancePerRequest();

            // Resolvers
            builder.RegisterType<UserNameResolver>().As<IUserNameResolver>().InstancePerRequest();
            builder.RegisterType<SslamService>().As<ISslamService>().InstancePerRequest();

            // Rules Engine
            builder.RegisterType<AssignmentsValidator>().As<AssignmentsValidatorBase>().InstancePerRequest();


            // Context Factories
            builder.RegisterType<ContextFactory>()
                .As<IContextFactory>()
                .InstancePerDependency();

            builder.Register(context => context.Resolve<IContextFactory>().GetContext<C3MSEntities>())
                .As<C3MSEntities>()
                .InstancePerDependency();

            builder.Register(context => context.Resolve<IContextFactory>().GetContext<SslamEntities>())
                .As<SslamEntities>()
                .InstancePerDependency();

            // Domain Query & Handlers

            // Security -- Query

            builder.RegisterType<GetUserGroupsQueryHandler>()
                .As<IQueryHandler<GetUserGroupsQuery, IEnumerable<string>>>()
                .InstancePerDependency();

            builder.RegisterType<GetUserGroupIdsQueryHandler>()
                .As<IQueryHandler<GetUserGroupIdsQuery, IEnumerable<int>>>()
                .InstancePerDependency();

            // Sslam -- Queries

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

            // Assignments -- Queries

            builder.RegisterType<FileTypeMappingIdQueryHandler>()
                .As<IQueryHandler<FileTypeMappingIdQuery, int>>()
                .InstancePerDependency();

            builder.RegisterType<FindAssignmentDetailsByVendorAndCourtFilingServiceIdQueryHandler>()
                .As<IQueryHandler<FindAssignmentDetailsByVendorAndCourtFilingServiceIdQuery, AssignmentDetails>>()
                .InstancePerDependency();

            builder.RegisterType<FindAssignmentDetailsQueryHandler>()
                .As<IQueryHandler<FindAssignmentDetailsQuery, IEnumerable<AssignmentDetails>>>()
                .InstancePerDependency();

            builder.RegisterType<FindCourtAssignmentQueryHandler>()
                .As<IQueryHandler<FindCourtAssignmentQuery, CourtAssignmentModel>>()
                .InstancePerDependency();

            builder.RegisterType<FindCourtFilingRecordQueryHandler>()
                .As<IQueryHandler<FindCourtFilingRecordQuery, bool>>()
                .InstancePerDependency();

            builder.RegisterType<FindCourtFilingServiceRecordQueryHandler>()
                .As<IQueryHandler<FindCourtFilingServiceRecordQuery, bool>>()
                .InstancePerDependency();

            builder.RegisterType<FindCurrentCourtFileTypeCdvOwnerQueryHandler>()
                .As<IQueryHandler<FindCurrentCourtFileTypeCdvOwnerQuery, CourtFileTypeOwner>>()
                .InstancePerDependency();

            builder.RegisterType<FindCurrentCourtFileTypeOwnerQueryHandler>()
                .As<IQueryHandler<FindCurrentCourtFileTypeOwnerQuery, CourtFileTypeOwner>>()
                .InstancePerDependency();

            builder.RegisterType<FindCurrentOwnerForCourtFileTypeServiceQueryHandler>()
                .As<IQueryHandler<FindCurrentOwnerForCourtFileTypeServiceQuery, OwnerInfo>>()
                .InstancePerDependency();

            builder.RegisterType<FindSlaVisitIntervalsQueryHandler>()
                .As<IQueryHandler<FindSlaVisitIntervalsQuery, bool>>()
                .InstancePerDependency();

            builder.RegisterType<FindVendorForCollectorQueryHandler>()
                .As<IQueryHandler<FindVendorForCollectorQuery, VendorModel>>()
                .InstancePerDependency();

            builder.RegisterType<GetAssignmentsQueryHandler>()
                .As<IQueryHandler<GetAssignmentsQuery, IEnumerable<AssignmentModel>>>()
                .InstancePerDependency();

            builder.RegisterType<GetVendorsForAssignmentsQueryHandler>()
                .As<IQueryHandler<GetVendorsForAssignmentsQuery, IEnumerable<VendorModel>>>()
                .InstancePerDependency();

            // Assignments -- Commands

            builder.RegisterType<InsertCourtAssignmentHistoryCommandHandler>()
                .As<ICommandHandler<InsertCourtAssignmentHistoryCommand>>()
                .InstancePerDependency();

            builder.RegisterType<UpdateCourtAssignmentActiveOwnerCommandHandler>()
                .As<ICommandHandler<UpdateCourtAssignmentActiveOwnerCommand>>()
                .InstancePerDependency();

            builder.RegisterType<UpdateCourtAssignmentCommandHandler>()
                .As<ICommandHandler<UpdateCourtAssignmentCommand>>()
                .InstancePerDependency();

            builder.RegisterType<UpdateCourtAssignmentServiceCommandHandler>()
                .As<ICommandHandler<UpdateCourtAssignmentServiceCommand>>()
                .InstancePerDependency();

            builder.RegisterType<UpdateCourtFilingServicesCommandHandler>()
                .As<ICommandHandler<UpdateCourtFilingServicesCommand>>()
                .InstancePerDependency();

            // Rates -- Queries

            builder.RegisterType<FindMatchingCourtAssignmentQueryHandler>()
                .As<IQueryHandler<FindMatchingCourtAssignmentQuery, DLL.VendorManagement.Models.C3MS.VendorRates.CourtAssignmentModel>>()
                .InstancePerDependency();

            builder.RegisterType<FindRateByVendorCourtFileTypeServiceQueryHandler>()
                .As<IQueryHandler<FindRateByVendorCourtFileTypeServiceQuery, IEnumerable<VendorRateModel>>>()
                .InstancePerDependency();

            builder.RegisterType<FindRatesByIdQueryHandler>()
                .As<IQueryHandler<FindRatesByIdQuery, IEnumerable<VendorRateModel>>>()
                .InstancePerDependency();

            builder.RegisterType<FindRatesByStateOrCollectorIdQueryHandler>()
                .As<IQueryHandler<FindRatesByStateOrCollectorIdQuery, IEnumerable<VendorRateModel>>>()
                .InstancePerDependency();

            // Rates -- Commands

            builder.RegisterType<InsertVendorRateHistoriesCommandHandler>()
                .As<ICommandHandler<InsertVendorRateHistoriesCommand>>()
                .InstancePerDependency();

            builder.RegisterType<UpdateRateInfoCommandHandler>()
                .As<ICommandHandler<UpdateRateInfoCommand>>()
                .InstancePerDependency();

            // Security -- Queries

            builder.RegisterType<GetUserGroupsQueryHandler>()
                .As<IQueryHandler<GetUserGroupsQuery, IEnumerable<string>>>()
                .InstancePerDependency();

            // Domain Command & Query Dispatchers

            builder.RegisterType<AutofacQueryDispatcher>()
                .As<IQueryDispatcher>()
                .InstancePerDependency();

            builder.RegisterType<AutofacCommandDispatcher>()
                .As<ICommandDispatcher>()
                .InstancePerDependency();

            var container = builder.Build();

            var config = GlobalConfiguration.Configuration;
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}