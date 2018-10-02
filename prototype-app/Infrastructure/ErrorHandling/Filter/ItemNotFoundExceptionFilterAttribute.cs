using System.Net;
using prototype_app.Infrastructure.ErrorHandling.Ex;

namespace prototype_app.Infrastructure.ErrorHandling.Filter
{
    public sealed class ItemNotFoundExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (!(context.Exception is ItemNotFoundException)) return;

            var resp = new HttpResponseMessage(HttpStatusCode.NotFound)
            {
                Content = new StringContent(context.Exception.Message),
                ReasonPhrase = "ItemNotFound"
            };

            throw new HttpResponseException(resp);
        }
    }
}