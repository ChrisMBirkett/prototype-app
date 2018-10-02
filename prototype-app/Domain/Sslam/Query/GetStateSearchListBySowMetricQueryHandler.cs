using System;
using System.Collections.Generic;
using prototype_app.Domain.Abstract;
using prototype_app.Models.Sslam;

namespace prototype_app.Domain.Sslam.Query
{
    public class GetStateSearchListBySowMetricQueryHandler : IQueryHandler<GetStateSearchListBySowMetricQuery, IEnumerable<StateSearchListModel>>
    {
        #region Member Variables

        private readonly SslamEntities _dbContext;

        #endregion

        #region Constructors

        public GetStateSearchListBySowMetricQueryHandler(SslamEntities dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException("no context provided to handler");
        }

        #endregion

        public IEnumerable<StateSearchListModel> Handle(GetStateSearchListBySowMetricQuery query)
        {
            return _dbContext.usp_GetStateListBySowMetricId_sel(query.SowMetricId)
                .Select(state => new StateSearchListModel { StateOfService = state })
                .ToList();
        }

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
