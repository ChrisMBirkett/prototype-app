namespace prototype_app.Data.ContextFactory.Abstract
{
    public interface IContextFactory
    {
        TContext GetContext<TContext>() where TContext : DbContext;
    }
}
