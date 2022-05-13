using System.Text;
using System.Security.Cryptography;

namespace Backend
{
    public static class Hash
    {
        public static string SHA1(string input)
        {
            var hash = new SHA1Managed().ComputeHash(Encoding.UTF8.GetBytes(input));
            return string.Concat(hash.Select(b => b.ToString("x2")));
        }
    }
}
