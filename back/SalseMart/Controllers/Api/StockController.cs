using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SalseMart.Dtos;
using SalseMart.Models;
using SalseMart.Services;
using System;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SalseMart.Controllers.Api
{
    [EnableCors(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-My-Header")]
    public class StockController : ApiController
    {
        private StockService _service;
        public StockController()
        {
            _service = new StockService();
        }
        [Route("Api/Stock/Get")]        
        [HttpPost]
        public IHttpActionResult GetStock(DataTableDTO dtoFrom)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var dtoTo = _service.GetStock(dtoFrom);
            return Ok(dtoTo);
        }
        [Route("Api/Stock/Insert")]
        [HttpPost]
        public IHttpActionResult CreateStock(string jsonString)
        {            
            _service.InsertStock(jsonString);    
            return Ok();
        }
        [Route("Api/Stock/Delete")]
        [HttpDelete]
        public IHttpActionResult DeleteStock(int id)
        {         
            _service.DeleteStock(id);
            return Ok();
        }
        [Route("Api/Stock/Update")]
        [HttpPut]
        public IHttpActionResult UpdateStock(string jsonString)
        {
            _service.UpdateStock(jsonString);
            return Ok();
        }
    }
}
