using Microsoft.AspNetCore.Mvc;
using Backend;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnswerController : ControllerBase
    {
        private readonly ILogger<AnswerController> _logger;

        public AnswerController(ILogger<AnswerController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public void Post(Answer answer)
        {

        }

        [HttpGet("AnswerId/{id:int}")]
        public Answer Get(int id)
        {
            Answer answer = new Answer();
            var rq = OracleConnect.ReaderQuery("Select * from Answer where AnswerId=" + id.ToString());
            if (rq != null)
            {
                rq.Read();
                answer.AnswerId = rq["AnswerId"].ToString();
                answer.QuestionId = rq["QuestionId"].ToString();
                answer.AnswerText = rq["AnswerText"].ToString();
                answer.IsCorrect = rq["IsCorrect"].ToString();
                rq.Dispose();
            }
            return answer;
        }

        [HttpGet("QuestionId/{id:int}")]
        public IEnumerable<Answer> GetAll(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Answer where QuestionId=" + id.ToString());
            IEnumerable<Answer> answers = new List<Answer>();
            if (rq != null)
            {
                while (rq.Read())
                {
                    Answer answer = new Answer();
                    answer.AnswerId = rq["AnswerId"].ToString();
                    answer.QuestionId = rq["QuestionId"].ToString();
                    answer.AnswerText = rq["AnswerText"].ToString();
                    answer.IsCorrect = rq["IsCorrect"].ToString();
                    answers = answers.Append(answer);
                }
                rq.Dispose();
            }
            return answers.ToArray();
        }
    }
}