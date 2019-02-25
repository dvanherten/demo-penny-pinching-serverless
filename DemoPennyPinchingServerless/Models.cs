using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoPennyPinchingServerless
{
    public class Quote
    {
        public string Id { get; set; } = Guid.NewGuid().ToString("n");
        public string WhoSaidIt { get; set; }
        public string WhatDidTheySay { get; set; }
    }

    public class QuoteCreateModel
    {
        public string WhoSaidIt { get; set; }
        public string WhatDidTheySay { get; set; }
    }

    public class QuoteTableEntity : TableEntity
    {
        public string WhoSaidIt { get; set; }
        public string WhatDidTheySay { get; set; }
    }

    public static class QuoteMappings
    {
        public static QuoteTableEntity ToTableEntity(this Quote Quote, string partitionKey)
        {
            return new QuoteTableEntity
            {
                PartitionKey = partitionKey,
                RowKey = Quote.Id,
                WhoSaidIt = Quote.WhoSaidIt,
                WhatDidTheySay = Quote.WhatDidTheySay
            };
        }

        public static Quote ToQuote(this QuoteTableEntity Quote)
        {
            return new Quote
            {
                Id = Quote.RowKey,
                WhoSaidIt = Quote.WhoSaidIt,
                WhatDidTheySay = Quote.WhatDidTheySay
            };
        }
    }
}
