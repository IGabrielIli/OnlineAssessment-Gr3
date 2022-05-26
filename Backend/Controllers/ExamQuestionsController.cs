using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamQuestionsController : ControllerBase
    {
        private readonly ILogger<ExamQuestionsController> _logger;

        public ExamQuestionsController(ILogger<ExamQuestionsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("byId")]
        public IEnumerable<Question> GetAll(int id)

        {
            var rq = OracleConnect.ReaderQuery("Select * from ExamQuestions where ExamId=" + id.ToString());
            IEnumerable<Question> questions = new List<Question>();
            IEnumerable<ExamQuestions> examquestions = new List<ExamQuestions>();
            if (rq != null)
            {
                while (rq.Read())
                {
                    ExamQuestions examquestion = new ExamQuestions();
                    examquestion.ExamId = rq["ExamId"].ToString();
                    examquestion.QuestionId = rq["QuestionId"].ToString();
                    examquestions = examquestions.Append(examquestion);
                }
                rq.Dispose();
            }
            for (int i = 0; i < examquestions.Count(); i++)
            {
                if (examquestions.ElementAt(i).QuestionId != null)
                {
                    var rq1 = OracleConnect.ReaderQuery("Select * from Question where QuestionId=" + examquestions.ElementAt(i).QuestionId.ToString());
                    if (rq1 != null)
                    {
                        rq1.Read();
                        Question question = new Question();
                        question.QuestionId = rq["QuestionId"].ToString();
                        question.QuestionImageUrl = rq["QuestionImageURL"].ToString();
                        question.QuestionText = rq["QuestionText"].ToString();
                        question.QuestionType = rq["QuestionType"].ToString();
                        question.QuestionDifficulty = rq["QuestionDifficulty"].ToString();
                        questions = questions.Append(question);
                        rq1.Dispose();
                    }
                }
            }
            return questions;
        }
    }
}