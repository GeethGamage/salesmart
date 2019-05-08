using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SalseMart.Dao;
using SalseMart.Dtos;
using SalseMart.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SalseMart.Services
{    
    public class StockService
    {
        StockDao _stockDao;
        public StockService()
        {
            _stockDao = new StockDao();
        }       
        public DataTableDTO GetStock(DataTableDTO dto)
        {
            var jsonObject = JObject.Parse(dto.dataTablesParameters);

            var start = (int)jsonObject["start"];
            var length = (int)jsonObject["length"];
            DataTable dt = _stockDao.GetStock(start, length);
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
            return dtoTo;
        }
        public void InsertStock(string jsonString)
        {
            var item = JsonConvert.DeserializeObject<StockDto>(jsonString);
            _stockDao.InsertStock(item);
        }
        public void DeleteStock(int id)
        {
            _stockDao.DeleteStock(id);
        }
        public void UpdateStock(string jsonString)
        {
            var item = JsonConvert.DeserializeObject<StockDto>(jsonString);
            _stockDao.UpdateStock(item);
        }
    }
}