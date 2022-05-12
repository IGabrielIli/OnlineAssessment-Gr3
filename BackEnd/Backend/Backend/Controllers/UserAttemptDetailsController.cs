using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAttemptDetailsController : ControllerBase
    {
        private readonly ILogger<UserAttemptDetailsController> _logger;

        public UserAttemptDetailsController(ILogger<UserAttemptDetailsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("AttemptId/{id:int}")]
        public UserAttemptDetails Get(int id)
        {
            UserAttemptDetails userAttemptDetails = new UserAttemptDetails();
            var rq = OracleConnect.ReaderQuery("Select * from UserAttemptDetails where AttemptId=" + id.ToString());
            if (rq != null)
            {
                rq.Read();
                userAttemptDetails.AttemptId = rq["AttemptId"].ToString();
                userAttemptDetails.UserId = rq["UserId"].ToString();
                userAttemptDetails.AttemptStart = rq["AttemptStart"].ToString();
                userAttemptDetails.AttemptEnd = rq["AttemptEnd"].ToString();
                rq.Dispose();
            }
            return userAttemptDetails;
        }
    }
}