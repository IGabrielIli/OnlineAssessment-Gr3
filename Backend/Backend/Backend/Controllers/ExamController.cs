using Microsoft.AspNetCore.Mvc;
using Backend;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExamController : ControllerBase
    {
        private readonly ILogger<ExamController> _logger;

        public ExamController(ILogger<ExamController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id:int}")]
        public Exam Get(int id)
        {
            Exam exam = new Exam();
            var rq = OracleConnect.ReaderQuery("Select * from Exam where ExamId=" + id.ToString());
            if (rq != null)
            {
                rq.Read();
                exam.ExamId = id;
                exam.UserId = rq["UserId"].ToString();
                exam.ExamName = rq["ExamName"].ToString();
                exam.ExamDate = rq["ExamStartDate"].ToString();
                exam.ExamCategory = rq["ExamCategory"].ToString();
                exam.ExamPasswordMD5 = rq["ExamPassword"].ToString();
                exam.ExamTimerSeconds = rq["ExamTimerSeconds"].ToString();
                exam.ExamDescription = rq["ExamDescription"].ToString();
                exam.ExamAvgDifficulty = rq["ExamAvgDifficulty"].ToString();
                exam.ExamQuestionAmount = rq["ExamQuestionAmount"].ToString();
                rq.Dispose();
            }
            return exam;
        }
    }
}