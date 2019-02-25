using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;

namespace DemoPennyPinchingServerless.Functions
{
    public class Functions
    {
        public const string TemporaryPartitionKey = "Quote";// Probably http context User Id after Auth
        public const string BaseRoute = "quote";
        public const string StorageConnectionName = "AzureWebJobsStorage";

        [FunctionName("GetQuotes")]
        public static async Task<IActionResult> GetQuotes(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = BaseRoute)]
            HttpRequest req,
            [Table("quotes", Connection = StorageConnectionName)]
            CloudTable quoteTable,
            ILogger log)
        {
            log.LogInformation("Getting quote items");
            var query = new TableQuery<QuoteTableEntity>().Where(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, TemporaryPartitionKey)
            );
            var segment = await quoteTable.ExecuteQuerySegmentedAsync(query, null);
            return new OkObjectResult(segment.Results.Select(QuoteMappings.ToQuote));
        }

        [FunctionName("CreateQuote")]
        public static async Task<IActionResult> CreateQuote(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = BaseRoute)]
            HttpRequest req,
            [Table("quotes", Connection = StorageConnectionName)]
            IAsyncCollector<QuoteTableEntity> quoteTable,
            ILogger log)
        {
            log.LogInformation("Creating a new quote list item");
            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var input = JsonConvert.DeserializeObject<QuoteCreateModel>(requestBody);

            var quote = new Quote
            {
                WhoSaidIt = input.WhoSaidIt,
                WhatDidTheySay = input.WhatDidTheySay
            };
            await quoteTable.AddAsync(quote.ToTableEntity(TemporaryPartitionKey));
            return new OkObjectResult(quote);
        }
    }
}
