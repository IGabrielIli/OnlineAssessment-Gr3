namespace Backend
{
    public class User
    {
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserRealName { get; set; }
        public string? UserEmail { get; set; }
        public string? UserPasswordMD5 { get; set; }
        public string? UserProfilePicURL { get; set; }
        public string? UserJobTitle { get; set; }
    }
}
