using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalseMart.Models
{
    public class Stock
    {
        public int ID { get; set; }
        public string CODE { get; set; }
        public string NAME { get; set; }
        public decimal WHOLESALE_PRICE { get; set; }
        public decimal RETAIL_PRICE { get; set; }
        public int ITEM_TYPE { get; set; }
        public int IN_STOCK { get; set; }
    }
}