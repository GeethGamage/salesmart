using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SalseMart.Dao
{    
    public class DBAccess
    {
        private readonly MySqlConnection _connection;        

        private DBAccess()
        {
            try
            {
            
            string connectionString = ConfigurationManager.ConnectionStrings["connstring"].ConnectionString;
            _connection = new MySqlConnection();
            _connection.ConnectionString = connectionString;
            }
            catch (Exception )
            {
                
            }
        }
        public static DBAccess Instance()
        {
            return new DBAccess();
        }
        public void OpenConnection()
        {
            try
            {
                _connection.Open();
            }            
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
           
        }

        public void CloseConnection()
        {
            _connection.Close();
        }

        public int ExecuteStoredProcedure(string name, params MySqlParameter[] commandParamters)
        {
            int count;
            using (var cmd = new MySqlCommand())
        {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Connection = _connection;
                cmd.CommandText = name;
                cmd.Parameters.AddRange(commandParamters);
                count = cmd.ExecuteNonQuery();
            }
            return count;
        }
        public void RunNonQuery(string myExecuteQuery)
        {
            try
            {            
            MySqlCommand myCommand = new MySqlCommand(myExecuteQuery, _connection);
            OpenConnection();
            myCommand.ExecuteNonQuery();
            CloseConnection();
            }
            catch (Exception E)
            {

                throw E;
            }
        }
        public DataTable RunQuery(string myExecuteQuery)
        {
            try { 
            MySqlCommand myCommand = new MySqlCommand(myExecuteQuery, _connection);
            OpenConnection();
            MySqlDataReader dataReader = myCommand.ExecuteReader();
            
            DataTable dt = new DataTable();
            if (dataReader.HasRows)
            {
                dt.Load(dataReader);
            }
          
            CloseConnection();
            return dt;
            }
            catch (Exception E)
            {

                throw E;
            }
        }
    }
}