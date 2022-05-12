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

        [HttpGet("{id:int}")]
        public User Get(int id)
        {
            User user = new User();
            var rq = OracleConnect.ReaderQuery("Select * from Users where UserId=" + id.ToString());
            if (rq != null)
            {
                rq.Read();
                user.UserId = id.ToString();
                // do work
                rq.Dispose();
            }
            return user;
        }
    }
}
