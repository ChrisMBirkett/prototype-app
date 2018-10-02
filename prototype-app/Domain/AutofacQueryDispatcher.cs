using System.Diagnostics.CodeAnalysis;
using prototype_app.Domain.Abstract;

namespace prototype_app.Domain
{
    [ExcludeFromCodeCoverage]
    public class AutofacQueryDispatcher : IQueryDispatcher
    {
        private readonly IComponentContext _componentContext;

        public AutofacQueryDispatcher(IComponentContext componentContext)
        {
            _componentContext = componentContext;
        }

        public TResult Dispatch<TResult>(IQuery<TResult> query)
        {
            var handlerType = typeof(IQueryHandler<,>).MakeGenericType(query.GetType(), typeof(TResult));

            dynamic handler = _componentContext.Resolve(handlerType);

            var result = handler.Handle((dynamic)query);

            handler.Dispose();

            return result;
        }
    }
}
