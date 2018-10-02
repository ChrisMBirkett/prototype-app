using AutoMapper;
using OKC.DLL.VendorManagement.Models.PagedSearch;
using OKC.DLL.VendorManagement.Models.Sslam;
using OKC.DLL.VendorManagement.Service.Models;

namespace OKC.DLL.VendorManagement.Service.Mapper
{
    public class PagedSearchRequestProfile : Profile
    {
        public PagedSearchRequestProfile()
        {
            // SSLAM search settings to paged search request map definition
            CreateMap<SslamPagedSearchSettings, PagedSearchRequest>();
            CreateMap<Models.Configurations.Parameter, Parameter>()
                .ForMember(p => p.Value, opt => opt.Ignore());
            CreateMap<Models.Configurations.Parameter[], Parameter[]>();
            CreateMap<Models.Configurations.ColumnConfiguration, ColumnConfiguration>();
            CreateMap<Models.Configurations.ColumnConfiguration[], ColumnConfiguration[]>();

            CreateMap<PagedSearchResult, SslamPagedSearchResult>();
            CreateMap<Column, Column>();
            CreateMap<Column[], Column[]>();
        }
    }
}
