using Microsoft.AspNetCore.Mvc;
using Backend;
using Backend.Models;
using Microsoft.AspNetCore.Cors;
using Oracle.ManagedDataAccess.Client;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class KeywordController : ControllerBase
    {
        private readonly ILogger<KeywordController> _logger;

        public KeywordController(ILogger<KeywordController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public String Create([FromForm]Keyword keyword)
        {
            if (OracleConnect.conn != null && keyword.KeywordId != null)
            {
                using OracleCommand command = OracleConnect.conn.CreateCommand();
                command.CommandText =
                    "Insert into Keyword " +
                    "(KeywordId, KeywordText) " +
                    "values(:KeywordId, :KeywordText) ";
                var hash = Hash.SHA1(keyword.KeywordText.ToLower());
                command.Parameters.Add(new OracleParameter("KeywordId", hash));
                command.Parameters.Add(new OracleParameter("KeywordText", keyword.KeywordText));
                try
                {
                    command.ExecuteNonQuery();
                    return "success";
                }
                catch (Exception)
                {
                }
            } 
            return "Fail";
        }

        [HttpGet("byId")]
        public Keyword Get(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Keyword where KeywordId=" + id.ToString());
            Keyword keyword = new Keyword();
            if (rq != null)
            {
                rq.Read();
                keyword.KeywordText = rq["KeywordText"].ToString();
                keyword.KeywordId = rq["KeywordId"].ToString();
                rq.Dispose();
            }
            return keyword;
        }
    }
}