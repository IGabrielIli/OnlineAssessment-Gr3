using Microsoft.AspNetCore.Mvc;
using Backend;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionKeywordsController : ControllerBase
    {
        private readonly ILogger<QuestionKeywordsController> _logger;

        public QuestionKeywordsController(ILogger<QuestionKeywordsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("QuestionId={id:int}")]
        public IEnumerable<QuestionKeywords> GetAll(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from QuestionKeywords where QuestionId=" + id.ToString());
            IEnumerable<QuestionKeywords> QuestionKeywords = new List<QuestionKeywords>();
            if (rq != null)
            {
                while (rq.Read())
                {
                    QuestionKeywords QuestionKeywords = new QuestionKeywords();
                    QuestionKeywords.QuestionId = rq["QuestionId"].ToString();
                    QuestionKeywords.KeywordId = rq["KeywordId"].ToString();
                    QuestionKeywords = QuestionKeywords.Append(QuestionKeywords);
                }
                rq.Dispose();
            }
            return QuestionKeywords.ToArray();
        }
    }
}
