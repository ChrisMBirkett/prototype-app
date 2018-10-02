using System;
using TestHelpers.ContextFactory.Abstract;
using TestHelpers.Database;

namespace TestHelpers.ContextFactory
{
    public class ContextFactory : IContextFactory
    {
        #region IContextFactory Implementation

        public TContext GetContext<TContext>() where TContext : DbContext
        {
            var type = typeof(TContext);

            var connectionString = GetConnectionString(type);

            if (string.IsNullOrEmpty(connectionString))
                throw new ApplicationException("Connection string not initialized");

            var ctor = type.GetConstructor(new Type[] { typeof(string) });

            if (ctor == null)
                throw new ApplicationException("Requested context does not contain expected constructor");

            return ctor.Invoke(new object[] { connectionString }) as TContext;
        }

        #endregion IContextFactory Implementation

        #region Private Methods

        private static string GetConnectionString(Type type)
        {
            //Can't switch on type, and missing patterns from C# 7 =(

            if (type == typeof(C3MSEntities))
                return DbContextHelpers.FormatC3msEfConnectionString(DbContextHelpers.GetC3msConnectionString());

            if (type == typeof(SslamEntities))
                return DbContextHelpers.FormatSslamEfConnectionString(DbContextHelpers.GetC3msConnectionString());

            return null;
        }

        #endregion Private Methods
    }
}
