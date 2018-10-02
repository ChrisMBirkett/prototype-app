
namespace prototype_app.Domain.Abstract
{
    public interface ICommandDispatcher
    {
        void Dispatch(ICommand command);
    }
}