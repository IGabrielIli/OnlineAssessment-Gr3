using Microsoft.AspNetCore.Mvc;
using Backend;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamKeywordsController : ControllerBase
    {
        private readonly ILogger<ExamKeywordsController> _logger;

        public ExamKeywordsController(ILogger<ExamKeywordsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("byId")]
        public IEnumerable<Keyword> GetAll(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from ExamKeywords where ExamId=" + id.ToString());
            IEnumerable<Keyword> keywords = new List<Keyword>();
            IEnumerable<ExamKeywords> examkeywords = new List<ExamKeywords>();
            if (rq != null)
            {
                while (rq.Read())
                {
                    ExamKeywords examkeyword = new ExamKeywords();
                    examkeyword.ExamId = rq["ExamId"].ToString();
                    examkeyword.KeywordId = rq["KeywordId"].ToString();
                    examkeywords = examkeywords.Append(examkeyword);
                }
                rq.Dispose();
            }

            for (int i = 0; i < examkeywords.Count(); i++)
            {
                if (examkeywords.ElementAt(i).KeywordId != null)
                {
                    var rq1 = OracleConnect.ReaderQuery("Select * from Keywords where KeywordId=" + examkeywords.ElementAt(i).KeywordId.ToString());
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