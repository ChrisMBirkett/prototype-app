using System;
using System.Collections.Generic;
using prototype_app.Domain.Abstract;
using prototype_app.Models.Sslam;

namespace prototype_app.Domain.Sslam.Query
{
    public class GetSowMetricListQueryHandler : IQueryHandler<GetSowMetricListQuery, IEnumerable<SowMetricSearchListModel>>
    {
        #region Member Variables

        private readonly SslamEntities _dbContext;

        #endregion

        #region Constructors

        public GetSowMetricListQueryHandler(SslamEntities dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException("no context provided to handler");
        }

        #endregion

        public IEnumerable<SowMetricSearchListModel> Handle(GetSowMetricListQuery query)
        {
            return _dbContext.SOWMetrics
                .Select(sm => new SowMetricSearchListModel{ SowMetricId = sm.SOWMetricID, SowMetricDescription = sm.SOWMetricDescription })
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
