using System;

namespace prototype_app.Infrastructure.ErrorHandling.Ex
{
    /// <summary>
    /// This exception is thrown when a user tries to perform an operation they are not permitted to.
    /// </summary>
    public class NotPermittedException : Exception
    {
        public NotPermittedException(string message) : base(message) { }
    }
}