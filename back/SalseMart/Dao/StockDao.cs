using MySql.Data.MySqlClient;
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
		
		public DataTable GetStock(int start,int limit,string code, string name)
		{
			try { 
			
				var parameters = new MySqlParameter[4];
				parameters[0] = new MySqlParameter();
				parameters[0].Direction = ParameterDirection.Input;
				parameters[0].DbType = DbType.String;
				parameters[0].ParameterName = "@itemCode";
				parameters[0].Value = code;

				parameters[1] = new MySqlParameter();
				parameters[1].Direction = ParameterDirection.Input;
				parameters[1].DbType = DbType.String;
				parameters[1].ParameterName = "@itemName";
				parameters[1].Value = name;

				parameters[2] = new MySqlParameter();
				parameters[2].Direction = ParameterDirection.Input;
				parameters[2].DbType = DbType.Int32;
				parameters[2].ParameterName = "@filterStart";
				parameters[2].Value = start;

				parameters[3] = new MySqlParameter();
				parameters[3].Direction = ParameterDirection.Input;
				parameters[3].DbType = DbType.Int32;
				parameters[3].ParameterName = "@filterLength";
				parameters[3].Value = limit;                            

                return _context.ExecuteStoredProcedure("GETITEMS", parameters);
			}
			catch (Exception E)
			{

				throw E;
			}
		}
        public DataTable GetStockTotal(string code, string name)
        {
            try
            {
                
                var parameters = new MySqlParameter[2];
                parameters[0] = new MySqlParameter();
                parameters[0].Direction = ParameterDirection.Input;
                parameters[0].DbType = DbType.String;
                parameters[0].ParameterName = "@itemCode";
                parameters[0].Value = code;

                parameters[1] = new MySqlParameter();
                parameters[1].Direction = ParameterDirection.Input;
                parameters[1].DbType = DbType.String;
                parameters[1].ParameterName = "@itemName";
                parameters[1].Value = name;            

                return _context.ExecuteStoredProcedure("GETITEMCOUNT", parameters);
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
		public int GetItem(int id)
		{
			string queryId = "select * from stock where id = " + id;
			DataTable dt = _context.RunQuery(queryId);
			return dt.Rows.Count;
		}
		public void UpdateStock(Stock dto)
		{
			try {	
			string query = "UPDATE stock SET CODE = '"+dto.code
				+"',NAME = '"+ dto.name
				+ "',WHOLESALE_PRICE = " + dto.wholesalePrice
				+ ",RETAIL_PRICE = " + dto.retailPrice
				+ ",ITEM_TYPE = " + dto.itemType
				+ ",IN_STOCK = " + dto.inStock
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