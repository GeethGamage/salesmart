using AutoMapper;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SalseMart.Dtos;
using SalseMart.Models;
using SalseMart.Services;
using System;
using System.Data;
using System.Linq;
using System.Net;
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
            try {         
            var dtoTo = _service.GetStock(dtoFrom);
            //if (dtoTo.dataList.Count == 0)
            //    return NotFound();
            return Ok(dtoTo);
            }
            catch (Exception E)
            {
                return InternalServerError(E);
            }
        }
        [Route("Api/Stock/Insert")]
        [HttpPost]
        public IHttpActionResult CreateStock(StockDto dto)
        {
            try { 
            if (!ModelState.IsValid)
                return BadRequest();
            var stock = Mapper.Map<StockDto, Stock>(dto);
            int id = _service.InsertStock(stock);
            dto.id = id;
            return Created(new Uri(Request.RequestUri + "/" + id), dto);
            }
            catch (Exception E)
            {
                return InternalServerError(E);
            }
        }
        [Route("Api/Stock/Delete/{id}")]
        [HttpDelete]
        public void DeleteStock(int id)
        {
            try {         
            _service.DeleteStock(id);
            }
            catch (Exception )
            {
                
            }
        }
        [Route("Api/Stock/Update")]
        [HttpPut]
        public IHttpActionResult UpdateStock(StockDto dto)
        {

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();
                var count = _service.GetItemCount(dto.id);
                if (count == 0)
                    return NotFound();
                var stock = Mapper.Map<StockDto, Stock>(dto);
                _service.UpdateStock(stock);
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception E)
            {
                return InternalServerError(E);
            }
    }
}
}
