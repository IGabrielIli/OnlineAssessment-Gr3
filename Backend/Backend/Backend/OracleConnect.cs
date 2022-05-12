using Oracle.ManagedDataAccess.Client;
using System.Data;
using System.Data.SqlClient;

namespace Backend
{
    public static class OracleConnect
    {

        public static void Connect()
        {
            if (conn == null)
            {
                if (!System.IO.File.Exists("userdata.txt"))
                {
                    Environment.Exit(1);
                }

                var lines = System.IO.File.ReadAllLines("userdata.txt");

                string user = lines[0];
                string pass = lines[1];

                string TNS = "Data Source=(DESCRIPTION =" +
                        "(ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.6.21)(PORT = 1521))" +
                        "(CONNECT_DATA =" +
                        "(SERVER = DEDICATED)" +
                        "(SID=dblabs)));" +
                        "User Id=" + user + ";Password=" + pass + ";";
                conn = new OracleConnection(TNS);
                conn.Open();
            }
        }
        public static OracleDataReader? ReaderQuery(string query)
        {
            if (conn != null)
            {
                OracleCommand command = conn.CreateCommand();
                command.CommandText = query;
                OracleDataReader dr = command.ExecuteReader();
                if (dr.HasRows)
                {
                    return dr;
                }
            }
            return null;
        }
        private static OracleConnection? conn;

    }
}
