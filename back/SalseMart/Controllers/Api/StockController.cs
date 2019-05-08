using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SalseMart.Core;
using SalseMart.Dtos;
using SalseMart.Models;
using System;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SalseMart.Controllers.Api
{
    public class StockController : ApiController
    {
        DBAccess _context;
        public StockController()
        {
            _context = DBAccess.Instance();
      
        }
        [Route("Api/Stock/All")]
        [EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-My-Header")]
        public IHttpActionResult GetStocks()
        {
            Console.WriteLine("Get Stock Total");
            DataTable dt = _context.RunQuery("select * from stock LIMIT 2,3");
                  
            return Ok(dt);
        }
       
        [EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-My-Header")]
        [HttpPost]
        public IHttpActionResult CreateStock(string jsonString)
        {
            var item = JsonConvert.DeserializeObject<Stock>(jsonString);
            string query = "INSERT INTO stock('CODE','NAME','WHOLESALE_PRICE','RETAIL_PRICE','ITEM_TYPE','IN_STOCK')"+ 
                " values(" + item.CODE+","+item.NAME+ "," + item.WHOLESALE_PRICE + "," + item.RETAIL_PRICE + "," + item.ITEM_TYPE + "," + item.IN_STOCK +")";
            _context.RunNonQuery(query);          
            return Ok(jsonString);
        }
        //[EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-My-Header")]
        //[HttpPut]
        //public IHttpActionResult UpdateStock(int id, string jsonString)
        //{
        //    var item = JsonConvert.DeserializeObject<Stock>(jsonString);

        //    string query = "UPDATE stock" +
        //        " SET ('CODE' =" + item.CODE + ",'NAME' = " + item.NAME + ",'WHOLESALE_PRICE' = " + item.WHOLESALE_PRICE + ",'RETAIL_PRICE' = " + item.RETAIL_PRICE + ",'ITEM_TYPE' = " + item.ITEM_TYPE + ",'IN_STOCK' = " + item.IN_STOCK + ") where id = "+id;
        //    _context.RunNonQuery(query);
        //    return Ok(jsonString);
        //}
        [Route("Api/Stock/List")]
        [EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-My-Header")]
        [HttpPost]
        public IHttpActionResult UpdateStock(DataTableDTO dtoFrom)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var tempDt = dtoFrom;
            var jsonObject = JObject.Parse(dtoFrom.dataTablesParameters);
            
            var start = (int)jsonObject["start"];
            var length = (int)jsonObject["length"];
            DataTable dt = _context.RunQuery("select * from stock LIMIT "+ start + ","+ length);
            var dtoTo = new DataTableDTO();
            dtoTo.dataList = new System.Collections.Generic.List<Object>();
            foreach (DataRow dr in dt.Rows)
            {
                var stock = new StockDto
                {
                    id = Convert.ToInt32(dr[0].ToString()),
                    code = dr[1].ToString(),
                    name = dr[2].ToString(),
                    wholesalePrice = Convert.ToDecimal(dr[3].ToString()),
                    retailPrice = Convert.ToDecimal(dr[4].ToString()),
                    inStock = Convert.ToInt32(dr[5].ToString()),
                    itemType = Convert.ToInt32(dr[6].ToString())
                };
                dtoTo.dataList.Add(stock);
            }
               
            return Ok(dtoTo);       
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-My-Header")]
        [HttpDelete]
        public IHttpActionResult DeleteStock(int id)
        {
           

            string query = "Delete FROM stock where id = "+id;
            _context.RunNonQuery(query);
            return Ok();
        }
    }
}
