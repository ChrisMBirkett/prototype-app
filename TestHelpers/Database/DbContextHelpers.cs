using System.IO;

namespace TestHelpers.Database
{
    public static class DbContextHelpers
    {
        private const string EfConnectionString =
            @"metadata=res://*/{0}.csdl|res://*/{0}.ssdl|res://*/{0}.msl;provider=System.Data.SqlClient;provider connection string='{1};MultipleActiveResultSets=True;App=EntityFramework';";

        public static string GetC3msConnectionString()
        {
            var databaseFilePath = Directory.GetParent(@Directory.GetCurrentDirectory()).Parent.FullName + "\\Database\\SslamData.mdf";

            var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["SlaGoalsEntities"].ConnectionString;

            if (connectionString.Contains("%DATABASEFILEPATH%"))
            {
                connectionString = connectionString.Replace("%DATABASEFILEPATH%", "\"" + databaseFilePath + "\"");
            }

            return connectionString;
        }

        public static string FormatC3msEfConnectionString(string connectionString) =>
            string.Format(EfConnectionString, "C3MS.C3MSEntities", connectionString);

        public static string FormatSslamEfConnectionString(string connectionString) =>
            string.Format(EfConnectionString, "Sslam.SslamEntities", connectionString);
    }
}
