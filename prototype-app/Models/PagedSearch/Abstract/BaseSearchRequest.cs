namespace prototype_app.Models.PagedSearch.Abstract
{
    public class BaseSearchRequest
    {
        public string SortBy { get; set; }
        public string SortDirection { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
