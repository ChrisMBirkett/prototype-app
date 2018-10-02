using System;

namespace TestHelpers.DependencyInjection.Settings.ConfigurationSetupExtensions
{
    /// <summary>
    /// This class is taken from the example implementation of using *.json files as settings files here:
    /// https://medium.com/@dmitryzaets/legacy-net-applications-configuration-management-net-framework-4-5-1-68220335d9d8
    ///
    /// The purpose of this extension class is to allow .NET Framework projects to use *.json files to manage configuration
    /// settings. This is based on how json configuration is managed in ASP.NET Core projects.
    /// </summary>
    public static class ConfigurationSetupExtensions
    {
        // Autofac version of:
        // https://github.com/aspnet/Options/blob/rel/1.1.1/src/Microsoft.Extensions.Options/OptionsServiceCollectionExtensions.cs#L20

        public static void RegisterOptions(this ContainerBuilder builder)
        {
            builder.RegisterGeneric(typeof(OptionsManager<>))
                .As(typeof(IOptions<>))
                .SingleInstance();

            builder.RegisterGeneric(typeof(OptionsMonitor<>))
                .As(typeof(IOptionsMonitor<>))
                .SingleInstance();
            
            builder.RegisterGeneric(typeof(OptionsSnapshot<>))
                .As(typeof(IOptionsSnapshot<>))
                .InstancePerLifetimeScope();
        }

        public static void Configure<TOptions>(this ContainerBuilder builder, Action<TOptions> configureOptions)
            where TOptions : class
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            if (configureOptions == null)
            {
                throw new ArgumentNullException(nameof(configureOptions));
            }

            builder.RegisterInstance(new ConfigureOptions<TOptions>(configureOptions))
                .As<IConfigureOptions<TOptions>>()
                .SingleInstance();
        }

        // Autofac version of:
        // https://github.com/aspnet/Options/blob/rel/1.1.1/src/Microsoft.Extensions.Options.ConfigurationExtensions/OptionsConfigurationServiceCollectionExtensions.cs#L22
        public static void RegisterConfigurationOptions<TOptions>(this ContainerBuilder builder, IConfiguration config)
            where TOptions : class
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            if (config == null)
            {
                throw new ArgumentNullException(nameof(config));
            }

            builder.RegisterInstance(new ConfigurationChangeTokenSource<TOptions>(config))
                .As<IOptionsChangeTokenSource<TOptions>>()
                .SingleInstance();

            builder.RegisterInstance(new ConfigureFromConfigurationOptions<TOptions>(config))
                .As<IConfigureOptions<TOptions>>()
                .SingleInstance();
        }
    }
}
