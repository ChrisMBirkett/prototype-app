using System.Diagnostics.CodeAnalysis;
using prototype_app.Domain.Abstract;

namespace prototype_app.Domain
{
    [ExcludeFromCodeCoverage]
    public class AutofacCommandDispatcher : ICommandDispatcher
    {
        private readonly IComponentContext _componentContext;

        public AutofacCommandDispatcher(IComponentContext componentContext)
        {
            _componentContext = componentContext;
        }

        public virtual void Dispatch(ICommand command)
        {
            var handlerType = typeof(ICommandHandler<>).MakeGenericType(command.GetType());

            dynamic handler = _componentContext.Resolve(handlerType);

            handler.Handle((dynamic)command);

            handler.Dispose();
        }

    }
}
