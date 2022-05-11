namespace Backend
{
    public class Exam
    {
        public int ExamId { get; set; }
        public int UserId { get; set; }
        public int ExamAverageDifficulty { get; set; }
        public int ExamTimeSeconds { get; set; }
        public int ExamQuestionAmount { get; set; }
        public string? ExamName { get; set; }
        public string? ExamPasswordMD5 { get; set; }
        public string? ExamCategory { get; set; }
        public string? ExamDescription { get; set; }
    }
}
