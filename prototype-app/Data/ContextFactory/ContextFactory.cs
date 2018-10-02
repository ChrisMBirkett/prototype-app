using System;
using prototype_app.Data.ContextFactory.Abstract;

namespace prototype_app.Data.ContextFactory
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
                return EfConnectionStrings.GetC3msConnectionString();

            if (type == typeof(SslamEntities))
                return EfConnectionStrings.GetSslamConnectionString();

            return null;
        }

        #endregion Private Methods
    }
}
