using Microsoft.AspNetCore.Mvc;
using Backend;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamController : ControllerBase
    {
        private readonly ILogger<ExamController> _logger;

        public ExamController(ILogger<ExamController> logger)
        {
            _logger = logger;
        }

        [HttpGet("UserId={id:int}")]
        public IEnumerable<Exam> GetAll(int id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Exam where UserId=" + id.ToString());
            IEnumerable<Exam> exams = new List<Exam>();
            if (rq != null)
            {
                while (rq.Read())
                {
                    Exam exam = new Exam();
                    exam.ExamId = rq["ExamId"].ToString();
                    exam.UserId = id.ToString();
                    exam.ExamName = rq["ExamName"].ToString();
                    exam.ExamDate = rq["ExamStartDate"].ToString();
                    exam.ExamCategory = rq["ExamCategory"].ToString();
                    exam.ExamPasswordMD5 = rq["ExamPassword"].ToString();
                    exam.ExamTimerSeconds = rq["ExamTimerSeconds"].ToString();
                    exam.ExamDescription = rq["ExamDescription"].ToString();
                    exam.ExamAvgDifficulty = rq["ExamAvgDifficulty"].ToString();
                    exam.ExamQuestionAmount = rq["ExamQuestionAmount"].ToString();
                    exams = exams.Append(exam);
                }
                rq.Dispose();
            }
            return exams.ToArray();
        }
    }
}