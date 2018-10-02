using System;
using prototype_app.Domain.Abstract;
using prototype_app.Models.PagedSearch;
using prototype_app.Models.Sslam;

namespace prototype_app.Domain.Sslam.Query
{
    public class GetSearchQueryHandler : IQueryHandler<GetSearchQuery, PagedSearchResult>
    {
        #region Member Variables
        private readonly SslamEntities _dbContext;
        #endregion

        #region Constructors
        public GetSearchQueryHandler(SslamEntities dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException("no context provided to handler");
        }
        #endregion

        #region IQueryHandler Impementation
        public PagedSearchResult Handle(GetSearchQuery query)
        {
            var pagedResultsRepo = _dbContext.PagedResults()
                .WithSearchResult<SslamSearchResultModel>();

            for (var i = 0; i < query.PagedSearchRequest.ColumnConfigurations.Count; i++)
            {
                pagedResultsRepo.WithColumnFilterResult();
            }

            var searchResult = pagedResultsRepo.Search(query.PagedSearchRequest);

            return searchResult;
        }
        #endregion

        #region IDisposable Implementation
        private bool disposedValue = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }

                disposedValue = true;
            }
        }
        public void Dispose()
        {
            Dispose(true);
        }
        #endregion

    }
}
