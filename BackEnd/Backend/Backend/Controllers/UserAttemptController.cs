using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAttemptController : ControllerBase
    {
        private readonly ILogger<UserAttemptController> _logger;

        public UserAttemptController(ILogger<UserAttemptController> logger)
        {
            _logger = logger;
        }

        [HttpGet("AttemptId/{id:int}")]
        public UserAttempt Get(int id)
        {
            UserAttempt userAttempt = new UserAttempt();
            var rq = OracleConnect.ReaderQuery("Select * from UserAttempt where AttemptId=" + id.ToString());
            if (rq != null)
            {
                rq.Read();
                userAttempt.AttemptId = rq["AttemptId"].ToString();
                userAttempt.ExamId = rq["ExamId"].ToString();
                userAttempt.QuestionId = rq["QuestionId"].ToString();
                userAttempt.AnswerId = rq["AnswerId"].ToString();           
                rq.Dispose();
            }
            return userAttempt;
        }
    }
}