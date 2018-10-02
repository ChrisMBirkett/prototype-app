using prototype_app.Models.PagedSearch;

namespace prototype_app.Models.Sslam
{
    [DataContract]
    [KnownType(typeof(SslamSearchResultModel))]
    public class SslamPagedSearchResult : PagedSearchResult
    {
    }
}
