using System;

namespace prototype_app.Infrastructure.ErrorHandling.Ex
{
    [Serializable]
    public class ItemNotFoundException : Exception
    {
        public ItemNotFoundException(string message) : base(message) { }
        public ItemNotFoundException(string message, Exception ex) : base(message, ex) { }
    }
}