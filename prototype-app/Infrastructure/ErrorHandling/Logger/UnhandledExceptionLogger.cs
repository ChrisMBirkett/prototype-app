namespace prototype_app.Infrastructure.ErrorHandling.Logger
{
    public class UnhandledExceptionLogger : ExceptionLogger
    {
        private static readonly log4net.ILog LogWriter = log4net.LogManager.GetLogger(typeof(UnhandledExceptionLogger));

        public UnhandledExceptionLogger()
        {
            LogWriter.Info("App started.");
        }

        public override void Log(ExceptionLoggerContext context)
        {
            //Do whatever logging you need to do here.
            LogWriter.Error("Exception caught!", context.Exception);
        }
    }
}