using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet("UserId/{id:int}")]
        public User Get(int id)
        {
            User user = new User();
            var rq = OracleConnect.ReaderQuery("Select * from Users where UserId=" + id.ToString());
            if (rq != null)
            {
                rq.Read();
                user.UserId = rq["UserId"].ToString();
                user.UserName = rq["UserName"].ToString();
                user.UserRealName = rq["UserRealName"].ToString();
                user.UserEmail = rq["UserEmail"].ToString();
                user.UserPasswordMD5 = rq["UserPassword"].ToString();
                user.UserProfilePicURL = rq["UserProfilePicURL"].ToString();
                user.UserJobTitle = rq["UserJobTitle"].ToString();
                rq.Dispose();
            }
            return user;
        }
    }
}
