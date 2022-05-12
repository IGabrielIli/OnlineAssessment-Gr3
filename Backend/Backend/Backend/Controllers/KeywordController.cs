using Microsoft.AspNetCore.Mvc;
using Backend;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KeywordController : ControllerBase
    {
        private readonly ILogger<KeywordController> _logger;

        public KeywordController(ILogger<KeywordController> logger)
        {
            _logger = logger;
        }

        [HttpGet("KeywordId={id:int}")]
        public Keyword Get(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Keyword where KeywordId=" + id.ToString());
            Keyword keyword = new Keyword();

            if (rq != null)
            {
                keyword.KeywordText = rq["KeywordText"].ToString();
                keyword.KeywordId = rq["KeywordId"].ToString();
                Keyword = Keyword.Append(keyword);
                rq.Dispose();
            }
            return keyword;
        }
    }
}