﻿using System.Threading;
using System.Threading.Tasks;

namespace prototype_app.Infrastructure.ErrorHandling.Result
{
    public class ValidationResult : IHttpActionResult
    {
        private HttpRequestMessage _request;
        private readonly HttpResponseMessage _httpResponseMessage;
        
        public ValidationResult(HttpRequestMessage request, HttpResponseMessage httpResponseMessage)
        {
            _request = request;
            _httpResponseMessage = httpResponseMessage;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(_httpResponseMessage);
        }
    }
}