
using Microsoft.AspNetCore.Mvc;
using Backend;
using Backend.Models;
using Oracle.ManagedDataAccess.Client;
using Microsoft.AspNetCore.Cors;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class QuestionController : ControllerBase
    {
        private readonly ILogger<QuestionController> _logger;

        public QuestionController(ILogger<QuestionController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public string Create([FromForm]Question question)
        {
            if (OracleConnect.conn != null && question.QuestionId != null)
            {
                using OracleCommand command = OracleConnect.conn.CreateCommand();
                command.CommandText =
                    "Insert into Questions " +
                    "(QuestionId, QuestionText, ) " + //TODO...
                    "values(:QuestionId, :QuestionText) ";
                var hash = Hash.SHA1(question.QuestionText);
                command.Parameters.Add(new OracleParameter("QuestionId", hash));
                command.Parameters.Add(new OracleParameter("QuestionText", question.QuestionText));
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
        public Question Get(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Question where QuestionId=" + id.ToString());
            Question question = new Question();
            if (rq != null)
            {
                rq.Read();
                question.QuestionId = rq["QuestionId"].ToString();
                question.QuestionImageUrl = rq["QuestionImageURL"].ToString();
                question.QuestionText = rq["QuestionText"].ToString();
                question.QuestionType = rq["QuestionType"].ToString();
                question.QuestionDifficulty = rq["QuestionDifficulty"].ToString();
                rq.Dispose();
            }
            return question;
        }

        [HttpGet("byUserId")]
        public IEnumerable<Question> UserGet(string id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Question where UserId=\'" + id.ToString() + "\'");
            IEnumerable<Question> questions = new List<Question>();
            if (rq != null)
            while (rq.Read()) {
                Question question = new Question();
                question.QuestionId = rq["QuestionId"].ToString();
                question.QuestionImageUrl = rq["QuestionImageURL"].ToString();
                question.QuestionText = rq["QuestionText"].ToString();
                question.QuestionType = rq["QuestionType"].ToString();
                question.QuestionDifficulty = rq["QuestionDifficulty"].ToString();
                question.UserId = rq["UserId"].ToString();
                questions = questions.Append(question);
            }
            rq.Dispose();
            return questions;
        }
    }
}