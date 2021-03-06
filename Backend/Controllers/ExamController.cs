using Microsoft.AspNetCore.Mvc;
using Backend;
using Oracle.ManagedDataAccess.Client;
using Microsoft.AspNetCore.Cors;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors]
    public class ExamController : ControllerBase
    {
        private readonly ILogger<ExamController> _logger;

        public ExamController(ILogger<ExamController> logger)
        {
            _logger = logger;
        }


        [HttpPost]
        public string Create([FromForm]Exam exam)
        {
            if (OracleConnect.conn != null && exam.ExamId != null)
            {
                using OracleCommand command = OracleConnect.conn.CreateCommand();
                command.CommandText =
                    "Insert into Exam " +
                    "(ExamId, UserId, ExamAvgDifficulty, ExamDate, ExamTimerSeconds, ExamQuestionAmount, ExamName, ExamPassword, ExamCategory, ExamDescription) " +
                    "values(:ExamId, :UserId, :ExamAvgDifficulty, :ExamDate, :ExamTimerSeconds, :ExamQuestionAmount, :ExamName, :ExamPassword, :ExamCategory, :ExamDescription) ";
                var hash = Hash.SHA1(exam.UserId + exam.ExamName);
                command.Parameters.Add(new OracleParameter("ExamId", hash));
                command.Parameters.Add(new OracleParameter("UserId", exam.UserId));
                command.Parameters.Add(new OracleParameter("ExamAvgDifficulty", exam.ExamAvgDifficulty));
                command.Parameters.Add(new OracleParameter("ExamDate", exam.ExamDate));
                command.Parameters.Add(new OracleParameter("ExamTimerSeconds", exam.ExamTimerSeconds));
                command.Parameters.Add(new OracleParameter("ExamQuestionAmount", exam.ExamQuestionAmount));
                command.Parameters.Add(new OracleParameter("ExamName", exam.ExamName));
                command.Parameters.Add(new OracleParameter("ExamPassword", exam.ExamPassword));
                command.Parameters.Add(new OracleParameter("ExamCategory", exam.ExamCategory));
                command.Parameters.Add(new OracleParameter("ExamDescription", exam.ExamDescription));
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

        [HttpGet("byUserId")]
        public IEnumerable<Exam> GetAll(string id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Exam where UserId=\'" + id.ToString() + "\'");
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
                    exam.ExamPassword = rq["ExamPassword"].ToString();
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
        [HttpGet("byId")]
        public Exam Get(string id)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Exam where ExamId=\'" + id.ToString() + "\'");
            Exam exam = new Exam();
            if (rq != null)
            {
                rq.Read();
                exam.ExamId = id.ToString();
                exam.UserId = rq["UserId"].ToString();
                exam.ExamName = rq["ExamName"].ToString();
                exam.ExamDate = rq["ExamStartDate"].ToString();
                exam.ExamCategory = rq["ExamCategory"].ToString();
                exam.ExamPassword = rq["ExamPassword"].ToString();
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