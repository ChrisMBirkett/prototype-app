using System;

namespace prototype_app.Infrastructure.ErrorHandling.Ex
{
    [Serializable]
    public class ValidationException : Exception
    {
        public ValidationException(string message) : base(message) { }
        public ValidationException(string message, Exception ex) : base(message, ex) { }
    }
}