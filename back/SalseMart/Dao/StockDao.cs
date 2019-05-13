using SalseMart.Dtos;
using SalseMart.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;

namespace SalseMart.Dao
{
	public class StockDao
	{
		DBAccess _context;
		public StockDao()
		{
			_context = DBAccess.Instance();
		}  
		public int GetStockCount()
		{
			try
			{
				string countQuery = "select COUNT(*) from stock";
				var count = _context.RunQuery(countQuery);
				return Convert.ToInt32(count.Rows[0][0]);
			}
			catch (Exception E)
			{

				throw E;
			}
		} 
		public DataTable GetStock(int start,int limit)
		{
			try { 
			string getStock = "select * from stock";
			var getStockLimit = getStock + " LIMIT "+start+","+limit;
			return _context.RunQuery(getStockLimit);
			}
			catch (Exception E)
			{

				throw E;
			}
		}
		public DataTable InsertStock(Stock stockDto)
		{
			try {           
			string query = "INSERT INTO stock(CODE,NAME,WHOLESALE_PRICE,RETAIL_PRICE,ITEM_TYPE,IN_STOCK)" +
				" values('" + stockDto.code + "','" + stockDto.name + "'," + stockDto.wholesalePrice + "," + stockDto.retailPrice + "," + stockDto.itemType + "," + stockDto.inStock + ")";
		   
		   _context.RunNonQuery(query);
			string queryMaxID = "SELECT MAX(ID) From Stock";
			return _context.RunQuery(queryMaxID);
			}
			catch (Exception E)
			{

				throw E;
			}

		} 
		public void DeleteStock(int id)
		{
			try { 
			string queryId = "select * from stock where id = " + id;
			DataTable dt = _context.RunQuery(queryId);
			if(dt.Rows.Count == 0)
				throw new HttpResponseException(HttpStatusCode.NotFound);
			string query = "Delete FROM stock where id = " + id;
			_context.RunNonQuery(query);
			}
			catch (Exception E)
			{

				throw E;
			}
		}
		public void UpdateStock(Stock dto)
		{
			try {        
			string queryId = "select * from stock where id = " + dto.id;
			DataTable dt = _context.RunQuery(queryId);
			if (dt.Rows.Count == 0)
				throw new HttpResponseException(HttpStatusCode.NotFound);
			string query = "UPDATE stock SET CODE = "+dto.code
				+"NAME = "+ dto.name
				+ "WHOLESALE_PRICE = " + dto.wholesalePrice
				+ "RETAIL_PRICE = " + dto.retailPrice
				+ "ITEM_TYPE = " + dto.itemType
				+ "IN_STOCK = " + dto.inStock
				+ "  where id = " + dto.id;
			_context.RunNonQuery(query);
			}
			catch (Exception E)
			{

				throw E;
			}
		}
		
	}
}