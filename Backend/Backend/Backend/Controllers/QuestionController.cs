
using Microsoft.AspNetCore.Mvc;
using Backend;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly ILogger<QuestionController> _logger;

        public QuestionController(ILogger<QuestionController> logger)
        {
            _logger = logger;
        }

        [HttpGet("QuestionId={id:int}")]
        public Question Get(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Question where QuestionId=" + id.ToString());
            Question question = new Question();
            if (rq != null)
            {
                question.QuestionId = rq["QuestionId"].ToString();
                question.QuestionImageUrl = rq["QuestionImageURL"].ToString();
                question.QuestionText = rq["QuestionText"].ToString();
                question.QuestionType = rq["QuestionType"].ToString();
                question.QuestionDifficulty = rq["QuestionDifficulty"].ToString();

                rq.Dispose();
            }
            return question;
        }
    }
}