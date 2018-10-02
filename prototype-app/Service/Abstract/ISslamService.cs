using OKC.DLL.VendorManagement.Models.PagedSearch;
using OKC.DLL.VendorManagement.Models.Sslam;
using OKC.DLL.VendorManagement.Service.Models;
using System.Collections.Generic;

namespace OKC.DLL.VendorManagement.Service.Abstract
{
    public interface ISslamService
    {
        IEnumerable<SowMetricSearchListModel> GetSowMetricSearchList();
        IEnumerable<StateSearchListModel> GetStateSearchListBySowMetric(int sowMetricId);
        SslamSearchListModel GetSearchListsByMetricAndState(int sowMetricId, string state);
        PagedSearchResult GetPagedSearchResult(SslamPagedSearchSettings pagedSaerchSettings, SslamSearchRequest searchRequest);
    }
}
