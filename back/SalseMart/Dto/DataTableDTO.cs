using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalseMart.Dtos
{
    public class DataTableDTO
    {
        public List<Object> dataList { get; set; }
        public string dataTablesParameters { get; set; }
        public int start { get; set; }
        public int length { get; set; }
        public long recordsTotal { get; set; }
        public long recordsFiltered { get; set; }
    }
}