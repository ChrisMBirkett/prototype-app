using OKC.DLL.VendorManagement.Configuration.Exceptions;
using OKC.DLL.VendorManagement.Domain.Abstract;
using OKC.DLL.VendorManagement.Domain.Sslam.Query;
using OKC.DLL.VendorManagement.Models.PagedSearch;
using OKC.DLL.VendorManagement.Models.Sslam;
using OKC.DLL.VendorManagement.Service.Abstract;
using OKC.DLL.VendorManagement.Service.Mapper;
using OKC.DLL.VendorManagement.Service.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OKC.DLL.VendorManagement.Service
{
    /// <summary>
    /// Class to handle interactions for the SLA management app
    /// </summary>
    public class SslamService : ISslamService
    {
        private IQueryDispatcher _queryDispatcher;
        private ICommandDispatcher _commandDispatcher;
        //private IAccountService _accountService;

        #region ctor

        /// <summary>
        /// Constructor for <see cref="SslamService"/>
        /// </summary>
        /// <param name="queryDispatcher"><see cref="IQueryDispatcher"/> to call queries in domain layer</param>
        /// <param name="commandDispatcher"><see cref="ICommandDispatcher"/> to call commands in domain layer</param>
        public SslamService(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher ?? throw new ArgumentNullException("no queryDispatcher provided to service");

            _commandDispatcher = commandDispatcher ?? throw new ArgumentNullException("no commandDispatcher service provided to service");
        }

        #endregion

        #region Public API

        public IEnumerable<SowMetricSearchListModel> GetSowMetricSearchList()
        {
            var query = new GetSowMetricListQuery();

            return _queryDispatcher.Dispatch(query);
        }

        public IEnumerable<StateSearchListModel> GetStateSearchListBySowMetric(int sowMetricId)
        {
            if (sowMetricId == 0)
                throw new ArgumentNullException(nameof(sowMetricId));

            var query = new GetStateSearchListBySowMetricQuery { SowMetricId = sowMetricId };

            return _queryDispatcher.Dispatch(query);
        }

        public SslamSearchListModel GetSearchListsByMetricAndState(int sowMetricId, string state)
        {
            if (sowMetricId == 0)
                throw new ArgumentNullException(nameof(sowMetricId));
            if (string.IsNullOrWhiteSpace(state))
                throw new ArgumentNullException(nameof(state));

            var query = new GetSearchListsByMetricAndStateQuery {SowMetricId = sowMetricId, State = state};

            return _queryDispatcher.Dispatch(query);
        }

        public PagedSearchResult GetPagedSearchResult(SslamPagedSearchSettings pagedSearchSettings, SslamSearchRequest searchRequest)
        {
            if (!ValidatePagedSearchSettings(pagedSearchSettings))
            {
                throw new InvalidSettingsException("The Sslam paged search settings are not valid.");
            }

            var pagedSearchRequest = MapSearchRequestToPagedSearchRequest(pagedSearchSettings, searchRequest);

            var query = new GetSearchQuery { PagedSearchRequest = pagedSearchRequest };

            var pagedSearchResult = _queryDispatcher.Dispatch(query);

            return MapPagedSearchResultToSslamPagedSearchResult(pagedSearchResult);
        }

        #endregion

        #region private methods

        private SslamPagedSearchResult MapPagedSearchResultToSslamPagedSearchResult(PagedSearchResult pagedSearchResult)
        {
            var mappedSearchResult = AutoMapper.Mapper.Map<SslamPagedSearchResult>(pagedSearchResult);

            return mappedSearchResult;
        }

        private PagedSearchRequest MapSearchRequestToPagedSearchRequest(SslamPagedSearchSettings pagedSearchSettings, SslamSearchRequest searchRequest)
        {
            var mappedSearchRequest = AutoMapper.Mapper.Map<PagedSearchRequest>(pagedSearchSettings);

            // assign searchRequest values to the matching Parameter object Value properties
            MapSearchRequestToPagedSearchRequestParameters.MapSearchRequest(searchRequest, mappedSearchRequest);

            return mappedSearchRequest;
        }

        private bool ValidatePagedSearchSettings(SslamPagedSearchSettings pagedSearchSettings)
        {
            var validationContext = new System.ComponentModel.DataAnnotations.ValidationContext(pagedSearchSettings, serviceProvider: null, items: null);
            var validationResults = new List<ValidationResult>();

            return Validator.TryValidateObject(pagedSearchSettings, validationContext, validationResults, true);
        }

        #endregion  
    }
}
