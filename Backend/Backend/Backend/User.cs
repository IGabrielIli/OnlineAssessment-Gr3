namespace Backend
{
    public class User
    {
        public int UserId { get; set; } = -1;
        public string UserName { get; set; } = "BAD-NAME";
        public string UserRealName { get; set; } = "BAD-REALNAME";
        public string UserEmail { get; set; } = "BAD-EMAIL";
        public string UserPasswordMD5 { get; set; } = "BAD-MD5";
        public string UserProfilePicURL { get; set; } = string.Empty;
        public string UserJobTitle { get; set; } = string.Empty;
    }
}
