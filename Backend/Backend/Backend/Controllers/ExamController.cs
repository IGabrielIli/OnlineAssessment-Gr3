using Microsoft.AspNetCore.Mvc;

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

        [HttpGet(Name = "GetTest")]
        public IEnumerable<Exam> Get()
        {
            IEnumerable<Exam> exams = new List<Exam>();
            exams = exams.Append(new Exam { ExamName = "Test" });
            return exams.ToArray();
        }
    }
}