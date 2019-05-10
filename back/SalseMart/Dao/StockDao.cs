using SalseMart.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SalseMart.Dao
{
    public class StockDao
    {
        DBAccess _context;
        public StockDao()
        {
            _context = DBAccess.Instance();
        }   
        public DataTable GetStock(int start,int limit)
        {
            string getStock = "select * from stock";
            var getStockLimit = getStock + " LIMIT "+start+","+limit;
            return _context.RunQuery(getStockLimit);
        }
        public void InsertStock(StockDto stockDto)
        {            
            string query = "INSERT INTO stock('CODE','NAME','WHOLESALE_PRICE','RETAIL_PRICE','ITEM_TYPE','IN_STOCK')" +
                " values(" + stockDto.code + "," + stockDto.name + "," + stockDto.wholesalePrice + "," + stockDto.retailPrice + "," + stockDto.itemType + "," + stockDto.inStock + ")";
Console.WriteLine(query);
            _context.RunNonQuery(query);            
        } 
        public void DeleteStock(int id)
        {
            string query = "Delete FROM stock where id = " + id;
            _context.RunNonQuery(query);
        }
        public void UpdateStock(StockDto dto)
        {
            string query = "UPDATE stock SET CODE = "+dto.code
                +"NAME = "+ dto.name
                + "WHOLESALE_PRICE = " + dto.wholesalePrice
                + "RETAIL_PRICE = " + dto.retailPrice
                + "ITEM_TYPE = " + dto.itemType
                + "IN_STOCK = " + dto.inStock
                + "  where id = " + dto.id;
            _context.RunNonQuery(query);
        }
        
    }
}