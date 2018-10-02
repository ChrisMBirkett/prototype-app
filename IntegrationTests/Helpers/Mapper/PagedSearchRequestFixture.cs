using System;

namespace IntegrationTests.Helpers.Mapper
{
    public class PagedSearchRequestFixture : IDisposable
    {
        public PagedSearchRequestFixture()
        {
            AutoMapper.Mapper.Initialize(config => {
                config.AddProfile<PagedSearchRequestProfile>();
            });
        }

        public void Dispose()
        {
        }
    }
}
