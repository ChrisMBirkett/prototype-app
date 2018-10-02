using System;
using System.Collections;
using System.Collections.Generic;

namespace prototype_app.Models.PagedSearch
{
    [DataContract]
    [KnownType(typeof(List<Column>))]
    public class PagedSearchResult
    {
        [DataMember]
        public IEnumerable SearchResults { get; set; }

        [DataMember]
        public List<Column> Columns { get; set; }

        [DataMember]
        public int Page { get; set; }

        [DataMember]
        public int PageSize { get; set; }

        [DataMember]
        public string SortBy { get; set; }

        [DataMember]
        public string SortDirection { get; set; }

        [DataMember]
        public int TotalResults { get; set; }

        private int _deserializerTotalPages;
        [DataMember]
        public int TotalPages
        {
            get
            {
                var totalPages = 0;
                if (PageSize != 0)
                {
                    // ReSharper disable once PossibleLossOfFraction
                    totalPages = (int)Math.Ceiling((double)(TotalResults / PageSize));
                }
                return totalPages;
            }
            private set => _deserializerTotalPages = value;
        }

        public PagedSearchResult()
        {
            Columns = new List<Column>();
        }
    }
}