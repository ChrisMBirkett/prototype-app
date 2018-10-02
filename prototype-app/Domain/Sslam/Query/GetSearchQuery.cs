using prototype_app.Domain.Abstract;
using prototype_app.Models.PagedSearch;

namespace prototype_app.Domain.Sslam.Query
{
    public class GetSearchQuery : IQuery<PagedSearchResult>
    {
        public PagedSearchRequest PagedSearchRequest { get; set; }
    }
}
