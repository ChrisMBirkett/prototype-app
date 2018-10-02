using System;
using System.Collections.Generic;
using System.Linq;
using prototype_app.Domain.Abstract;
using prototype_app.Models.Sslam;

namespace prototype_app.Domain.Sslam.Query
{
    public class GetSearchListsByMetricAndStateQueryHandler : IQueryHandler<GetSearchListsByMetricAndStateQuery, SslamSearchListModel>
    {
        private readonly SslamEntities _dbContext;

        private const string COURT_SEARCH_LIST = "CourtSearchList";
        private const string FILE_TYPE_LIST = "FileTypeList";
        private const string COURT_TYPE_LIST = "CourtTypeList";
        private const string SUPPLIER_LIST = "SupplierList";

        public GetSearchListsByMetricAndStateQueryHandler(SslamEntities dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException("no context provided to handler");
        }

        public SslamSearchListModel Handle(GetSearchListsByMetricAndStateQuery query)
        {
            var lists = _dbContext.usp_GetSslamSearchListsByMetricAndState_sel(query.SowMetricId, query.State).ToList();

            var sslamSearchListModel = new SslamSearchListModel
            {
                Courts = GetCourtSearchList(lists),
                CourtTypes = GetCourtTypesList(lists),
                FileTypes = GetFileTypesList(lists),
                Suppliers = GetSuppliersList(lists)
            };

            return sslamSearchListModel;
        }

        #region private methods

        private IEnumerable<CourtSearchListModel> GetCourtSearchList(List<usp_GetSslamSearchListsByMetricAndState_sel_Result> lists)
        {
            return lists
                .Where(c => string.Compare(c.ListType, COURT_SEARCH_LIST, StringComparison.OrdinalIgnoreCase) == 0)
                .Select(c => new CourtSearchListModel
                {
                    MasterId = c.Value
                })
                .ToList();
        }

        private IEnumerable<CourtTypeSearchListModel> GetCourtTypesList(List<usp_GetSslamSearchListsByMetricAndState_sel_Result> lists)
        {
            return lists
                .Where(ct => string.Compare(ct.ListType, COURT_TYPE_LIST, StringComparison.OrdinalIgnoreCase) == 0)
                .Select(ct => new CourtTypeSearchListModel
                {
                    CourtType = ct.Value,
                    TypeDescriptor = ct.Description
                })
                .ToList();
        }

        private IEnumerable<FileTypeSearchListModel> GetFileTypesList(List<usp_GetSslamSearchListsByMetricAndState_sel_Result> lists)
        {
            return lists
                .Where(f => string.Compare(f.ListType, FILE_TYPE_LIST, StringComparison.OrdinalIgnoreCase) == 0)
                .Select(f => new FileTypeSearchListModel
                {
                    FileTypeId = f.Value,
                    FileTypeName = f.Description
                })
                .ToList();
        }

        private IEnumerable<SupplierSearchListModel> GetSuppliersList(List<usp_GetSslamSearchListsByMetricAndState_sel_Result> lists)
        {
            return lists
                .Where(s => string.Compare(s.ListType, SUPPLIER_LIST, StringComparison.OrdinalIgnoreCase) == 0)
                .Select(s => new SupplierSearchListModel
                {
                    VendorId = s.Value,
                    BusinessName = s.Description
                })
                .ToList();
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
