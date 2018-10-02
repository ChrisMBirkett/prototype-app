using System.Collections.Generic;

namespace prototype_app.Models.PagedSearch
{
    public class PagedSearchRequest
    {
        public string SearchStoredProcedure { get; set; }
        public List<Parameter> Parameters { get; set; }
        public string SearchResultSetType { get; set; }
        public List<ColumnConfiguration> ColumnConfigurations { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }
        public string SortDirection { get; set; }

        public PagedSearchRequest()
        {
            Parameters = new List<Parameter>();
            ColumnConfigurations = new List<ColumnConfiguration>();
        }
    }
}
