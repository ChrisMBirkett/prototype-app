using TestHelpers.DependencyInjection.Settings;

namespace TestHelpers.DependencyInjection
{
    public static class DIOptionsHelper
    {
        public static IContainer SetupOptionsContainerBuilder()
        {
            var builder = new ContainerBuilder();
            builder.RegisterModule(new CompositionRoot());

            return builder.Build();
        }
    }
}
