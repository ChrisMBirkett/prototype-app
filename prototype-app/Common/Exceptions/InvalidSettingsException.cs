using System;

namespace prototype_app.Common.Exceptions
{
    public class InvalidSettingsException : Exception
    {
        public InvalidSettingsException()
        {
        }

        public InvalidSettingsException(string message)
            : base(message)
        {
        }

        public InvalidSettingsException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
