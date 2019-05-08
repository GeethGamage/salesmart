using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalseMart.Dtos
{
    public class StockDto
    {
        public int id { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public decimal wholesalePrice { get; set; }
        public decimal retailPrice { get; set; }
        public int itemType { get; set; }
        public int inStock { get; set; }
    }
}