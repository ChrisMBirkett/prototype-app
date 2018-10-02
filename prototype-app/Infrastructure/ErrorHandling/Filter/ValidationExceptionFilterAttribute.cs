using System.Net;
using prototype_app.Infrastructure.ErrorHandling.Ex;

namespace prototype_app.Infrastructure.ErrorHandling.Filter
{
    public sealed class ValidationExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (!(context.Exception is ValidationException)) return;

            var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(context.Exception.Message),
                ReasonPhrase = "Validation"
            };

            throw new HttpResponseException(resp);
        }
    }
}