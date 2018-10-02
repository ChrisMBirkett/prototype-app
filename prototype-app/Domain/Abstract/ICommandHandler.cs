using System;

namespace prototype_app.Domain.Abstract
{
    public interface ICommandHandler<TCommand> :IDisposable
        where TCommand : ICommand
    {
        void Handle(TCommand command);
    }
}
