using System;
using prototype_app.Infrastructure.ErrorHandling.Ex;
using prototype_app.Infrastructure.ErrorHandling.Result;

namespace prototype_app.Infrastructure.ErrorHandling.Handler
{
    /// <summary>
    /// https://docs.microsoft.com/en-us/aspnet/web-api/overview/error-handling/web-api-global-error-handling
    /// </summary>
    public class GlobalExceptionHandler : ExceptionHandler
    {
        private const string ContactEmail = "HelpDesk@lexisnexisrisk.com";

        private static readonly log4net.ILog LogWriter = log4net.LogManager.GetLogger(typeof(GlobalExceptionHandler));

        public override void Handle(ExceptionHandlerContext context)
        {
            if (context.Exception is ValidationException)
            {
                context.Result = new ValidationResult(context.ExceptionContext.Request, context.ExceptionContext.Response);
            }
            else if (context.Exception is ItemNotFoundException)
            {
                context.Result = new ItemNotFoundResult(context.ExceptionContext.Request, context.ExceptionContext.Response);
            }
            else if (context.Exception is ArgumentNullException)
            {
                context.Result = new ArgumentNullResult
                {
                    Request = context.ExceptionContext.Request,
                    Content = JsonConvert.SerializeObject(context.Exception.Message)
                };
            }
            else if (context.Exception is NotPermittedException)
            {
                context.Result = new NotPermittedExceptionResult
                {
                    Request = context.ExceptionContext.Request,
                    Content = JsonConvert.SerializeObject(context.Exception.Message)
                };
            }
            else
            {
                LogWriter.Error("Unhandled exception.", context.Exception);

                context.Result = new UnhandledExceptionResult
                {
                    Request = context.ExceptionContext.Request,
                    Content = context.Exception.Message == null ? JsonConvert.SerializeObject($"Oops! Sorry! Something went wrong. Please contact {ContactEmail} so that we can try to fix it.")
                     : JsonConvert.SerializeObject(context.Exception.Message)
                };
            }
        }

        /// <summary>
        /// This is here to make sure that, with CORS enabled, exceptions are always handled if it gets to this class
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public override bool ShouldHandle(ExceptionHandlerContext context) => true;
    }
}