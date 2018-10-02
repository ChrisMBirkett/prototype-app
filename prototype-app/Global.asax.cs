using System;
using System.Web.Routing;
using prototype_app.Service.Mapper;

namespace prototype_app
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            RouteTable.Routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            DependencyInjectionConfig.RegisterDependencies();
            GlobalConfiguration.Configuration.IncludeErrorDetailPolicy
                = IncludeErrorDetailPolicy.LocalOnly;
            GlobalConfiguration.Configuration.EnsureInitialized();

            AutoMapper.Mapper.Initialize(config => {
                config.AddProfile<PagedSearchRequestProfile>();
            });
        }
    }
}