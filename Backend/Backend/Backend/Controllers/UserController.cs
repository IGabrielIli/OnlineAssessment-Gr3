using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;

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

        [HttpPost]
        public static void Post(User user)
        {
            if (OracleConnect.conn != null)
            {
                using OracleCommand command = OracleConnect.conn.CreateCommand();
                command.CommandText =
                    "Insert into Users " +
                    "(UserId, UserName, UserRealName, UserEmail, UserPassword, UserProfilePicURL, UserJobTitle) " +
                    "values(:UserId, :UserName, :UserRealName, :UserEmail, :UserPassword, :UserProfilePicURL, :UserJobTitle) ";
                command.Parameters.Add(new OracleParameter("UserId", user.UserId));
                command.Parameters.Add(new OracleParameter("UserName", user.UserName));
                command.Parameters.Add(new OracleParameter("UserRealName", user.UserRealName));
                command.Parameters.Add(new OracleParameter("UserEmail", user.UserEmail));
                command.Parameters.Add(new OracleParameter("UserPassword", user.UserPasswordMD5));
                command.Parameters.Add(new OracleParameter("UserProfilePicURL", user.UserProfilePicURL));
                command.Parameters.Add(new OracleParameter("UserJobTitle", user.UserJobTitle));
                command.ExecuteNonQuery();
            }
        }

        [HttpGet("byId")]
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

        // Returns userId if logged in, -1 if not
        [HttpGet("login")]
        public string Get(string userName, string userPassword)
        {
            var rq = OracleConnect.ReaderQuery("Select * from Users where UserName=" + userName + " and UserPassword=" + userPassword);
            if (rq != null)
            {
                rq.Read();
                string? ret = rq["UserId"].ToString();
                if (ret == null)
                {
                    return "-1";
                }
                return ret;
            }
            return "-1";
        }

    }
}
