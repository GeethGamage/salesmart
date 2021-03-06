﻿using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SalseMart.Dao;
using SalseMart.Dtos;
using SalseMart.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Http;

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
            try
            {                         
            var jsonObject = JObject.Parse(dto.dataTablesParameters);
            var jsonSearchF = JObject.Parse(dto.searchField); 
                var start = (int)jsonObject["start"];
            var length = (int)jsonObject["length"];
                var code = (string)jsonSearchF["code"];
                var name = (string)jsonSearchF["name"];
                var order = (string)jsonSearchF["order"];
            DataTable dt = _stockDao.GetStock(start, length,code,name);
                DataTable dtTotal = _stockDao.GetStockTotal(code, name);
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
                    itemType = Convert.ToInt32(dr[5].ToString()),
                    inStock = Convert.ToInt32(dr[6].ToString())
                };
                dtoTo.dataList.Add(stock);
            }
            
                var totCount = Convert.ToInt32(dtTotal.Rows[0][0]);
            dtoTo.recordsTotal = totCount;
            dtoTo.recordsFiltered = totCount;
            return dtoTo;
            }
            catch (Exception E)
            {

                throw E;
            }
        }
        public int InsertStock(Stock item)
        {
            try {      
            DataTable dt = _stockDao.InsertStock(item);
            string id = dt.Rows[0][0].ToString();
            return Convert.ToInt32(id);
            }
            catch (Exception E)
            {

                throw E;
            }
        }
        public void DeleteStock(int id)
        {
            try { 
            _stockDao.DeleteStock(id);
            }
            catch (Exception E)
            {

                throw E;
            }
        }
        public int GetItemCount(int id)
        {
            try
            {
                return _stockDao.GetItem(id);
            }
            catch (Exception E)
            {

                throw E;
            }
        }
        public void UpdateStock(Stock item)
        {
            try {               
                    
            _stockDao.UpdateStock(item);
            }
            catch (Exception E)
            {

                throw E;
            }
        }
    }
}