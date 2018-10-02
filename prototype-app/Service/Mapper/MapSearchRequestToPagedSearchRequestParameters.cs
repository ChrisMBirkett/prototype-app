using OKC.DLL.VendorManagement.Models.PagedSearch;
using System.Reflection;

namespace OKC.DLL.VendorManagement.Service.Mapper
{
    public static class MapSearchRequestToPagedSearchRequestParameters
    {
        // TODO: Move these out into a reusable class or other construct
        private const string PAGE_PROPERTY_NAME = "page";
        private const string PAGE_SIZE_PROPERTY_NAME = "pagesize";
        private const string SORT_BY_PROPERTY_NAME = "sortby";
        private const string SORT_DIRECTION_PROPERTY_NAME = "sortdirection";

        public static void MapSearchRequest(object searchRequest, PagedSearchRequest pagedSearchRequest)
        {
            // assign searchRequest values to the matching Parameter object Value properties
            foreach (PropertyInfo propertyInfo in searchRequest.GetType().GetProperties())
            {
                if (propertyInfo.CanRead)
                {
                    var propertyName = propertyInfo.Name;
                    var pagedSearchParameter = pagedSearchRequest.Parameters.Find(p =>
                        string.Equals(p.Name.ToLower(), propertyName.ToLower()));

                    if (pagedSearchParameter != null)
                    {
                        pagedSearchParameter.Value = propertyInfo.GetValue(searchRequest);
                    }
                    else
                    {
                        // If it is not a parameter, check to see if it matches one of the following
                        // TODO: Is there a dynamic way to do this? Automapper before this is called? Will changing these properties to object type simplify this code?
                        if (propertyName.ToLower().Equals(PAGE_PROPERTY_NAME))
                        {
                            pagedSearchRequest.Page = (int)propertyInfo.GetValue(searchRequest);
                        }
                        else if (propertyName.ToLower().Equals(PAGE_SIZE_PROPERTY_NAME))
                        {
                            pagedSearchRequest.PageSize = (int)propertyInfo.GetValue(searchRequest);
                        }
                        else if (propertyName.ToLower().Equals(SORT_BY_PROPERTY_NAME))
                        {
                            pagedSearchRequest.SortBy = propertyInfo.GetValue(searchRequest).ToString();
                        }
                        else if (propertyName.ToLower().Equals(SORT_DIRECTION_PROPERTY_NAME))
                        {
                            pagedSearchRequest.SortDirection = propertyInfo.GetValue(searchRequest).ToString();
                        }
                    }
                }
            }
        }
    }
}
