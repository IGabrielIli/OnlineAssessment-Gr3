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

        [HttpGet("ExamId={id:int}")]
        public IEnumerable<ExamKeywords> GetAll(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from ExamKeywords where ExamId=" + id.ToString());
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
            return examkeywords.ToArray();
        }
    }
}