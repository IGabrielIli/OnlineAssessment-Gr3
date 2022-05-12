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

        [HttpGet("ExamId/{id:int}")]
        public IEnumerable<ExamQuestions> GetAll(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from ExamQuestions where ExamId=" + id.ToString());
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
            return examquestions.ToArray();
        }
    }
}