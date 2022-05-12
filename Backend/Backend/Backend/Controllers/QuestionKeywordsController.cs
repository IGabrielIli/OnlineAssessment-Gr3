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
            return questionKeywords.ToArray();
        }
    }
}
