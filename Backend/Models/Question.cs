namespace Backend
{
    public class Question
    {
        public string? QuestionId { get; set; }
        public string? QuestionImageUrl { get; set; }
        public string? QuestionText { get; set; }
        public string? QuestionType { get; set; }
        public string? QuestionDifficulty { get; set; }

        public string? UserId { get; set;}
        
    }
}
