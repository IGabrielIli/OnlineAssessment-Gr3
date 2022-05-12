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

        [HttpGet("AnswerId=")]
        public Answer Get(int id)
        {
            Answer answer = new Answer();
            var rq = OracleConnect.ReaderQuery("Select * from Answers where UserId=" + id.ToString());
            if (rq != null)
            {
                rq.Read();
                answer.UserId = id.ToString();
                // do work
                rq.Dispose();
            }
            return user;
        }

        [HttpGet("QuestionId={id:int}")]
        public IEnumerable<Answer> GetAll(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Answer where QuestionId=" + id.ToString());
            IEnumerable<Answer> answers = new List<Answer>();
            if (rq != null)
            {
                while (rq.Read())
                {
                    Answer answer = new Answer();

                    answers = answers.Append(answer);
                }
                rq.Dispose();
            }
            return answers.ToArray();
        }
    }
}