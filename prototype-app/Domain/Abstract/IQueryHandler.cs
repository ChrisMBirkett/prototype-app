using System;

namespace prototype_app.Domain.Abstract
{
    public interface IQueryHandler<TQuery, TResult> : IDisposable
        where TQuery : IQuery<TResult>
    {
        TResult Handle(TQuery query);
    }
}
