namespace Backend
{
    public class Exam
    {
        public int ExamId { get; set; }
        public string? UserId { get; set; }
        public string? ExamAvgDifficulty { get; set; }
        public string? ExamDate { get; set; }
        public string? ExamTimerSeconds { get; set; }
        public string? ExamQuestionAmount { get; set; }
        public string? ExamName { get; set; }
        public string? ExamPasswordMD5 { get; set; }
        public string? ExamCategory { get; set; }
        public string? ExamDescription { get; set; }
    }
}
