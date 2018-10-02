using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace prototype_app.Infrastructure.ErrorHandling.Result
{
    public class UnhandledExceptionResult : IHttpActionResult
    {
        public HttpRequestMessage Request { get; set; }

        public string Content { get; set; }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var response = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(Content),
                RequestMessage = Request
            };
            return Task.FromResult(response);
        }
    }
}