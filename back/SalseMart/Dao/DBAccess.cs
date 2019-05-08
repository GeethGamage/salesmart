using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SalseMart.Core
{    
    public class DBAccess
    {
        private readonly MySqlConnection _connection;        

        private DBAccess()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["connstring"].ConnectionString;
            _connection = new MySqlConnection();
            _connection.ConnectionString = connectionString;           
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
            MySqlCommand myCommand = new MySqlCommand(myExecuteQuery, _connection);
            OpenConnection();
            myCommand.ExecuteNonQuery();
            CloseConnection();
        }
        public DataTable RunQuery(string myExecuteQuery)
        {
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
    }
}