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

        [HttpGet("byId")]
        public IEnumerable<Keyword> GetAll(int id)

        {
            var rq = OracleConnect.ReaderQuery("Select * from QuestionKeywords where QuestionId=" + id.ToString());
            IEnumerable<Keyword> keywords = new List<Keyword>();
            IEnumerable<QuestionKeywords> questionKeywords = new List<QuestionKeywords>();
            if (rq != null)
            {
                while (rq.Read())
                {
                    QuestionKeywords questionKeyword = new QuestionKeywords();
                    questionKeyword.QuestionId = rq["QuestionId"].ToString();
                    questionKeyword.KeywordId = rq["KeywordId"].ToString();
                    questionKeywords = questionKeywords.Append(questionKeyword);
                }
                rq.Dispose();
            }
            for (int i = 0; i < questionKeywords.Count(); i++)
            {
                if (questionKeywords.ElementAt(i).KeywordId != null)
                {
                    var rq1 = OracleConnect.ReaderQuery("Select * from Keyword where KeywordId=" + questionKeywords.ElementAt(i).KeywordId.ToString());
                    if (rq1 != null)
                    {
                        rq1.Read();
                        Keyword keyword = new Keyword();
                        keyword.KeywordId = rq1["KeywordId"].ToString();
                        keyword.KeywordText = rq1["KeywordText"].ToString();
                        keywords = keywords.Append(keyword);
                        rq1.Dispose();
                    }
                }
            }
            return keywords;
        }
    }
}
