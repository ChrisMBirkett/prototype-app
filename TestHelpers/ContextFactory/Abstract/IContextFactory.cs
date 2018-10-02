namespace TestHelpers.ContextFactory.Abstract
{
    public interface IContextFactory
    {
        TContext GetContext<TContext>() where TContext : DbContext;
    }
}
