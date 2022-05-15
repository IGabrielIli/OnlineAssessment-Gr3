using Microsoft.AspNetCore.Mvc;
using Backend;
using Oracle.ManagedDataAccess.Client;
using Microsoft.AspNetCore.Cors;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class AnswerController : ControllerBase
    {
        private readonly ILogger<AnswerController> _logger;

        public AnswerController(ILogger<AnswerController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public string Create([FromForm]Answer answer)
        {
            if (OracleConnect.conn != null && answer.QuestionId != null)
            {
                using OracleCommand command = OracleConnect.conn.CreateCommand();
                command.CommandText =
                    "Insert into Answer " +
                    "(AnswerId, QuestionId, AnswerText, IsCorrect) " +
                    "values(:AnswerId, :QuestionId, :AnswerText, :IsCorrect) ";
                var hash = Hash.SHA1(answer.AnswerText);
                command.Parameters.Add(new OracleParameter("AnswerId", hash));
                command.Parameters.Add(new OracleParameter("QuestionId", answer.QuestionId));
                command.Parameters.Add(new OracleParameter("AnswerText", answer.AnswerText));
                command.Parameters.Add(new OracleParameter("IsCorrect", answer.IsCorrect));
                try
                {
                    command.ExecuteNonQuery();
                    return "success";
                }
                catch (Exception)
                {
                }
            }
            return "fail";
        }

        [HttpGet("byId")]
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

        [HttpGet("byQuestionId")]
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