#if false
namespace ReactMaaserTrackerMUI.Data
{
    public class AccountRepo
    {
        private readonly string _connectionS;

        public AccountRepo(string cS)
        {
            _connectionS = cS;
        }

        public User GetUserByEmail(string email)
        {
            var ctx = new MaaserTrackerDataContext(_connectionS);
           return ctx.Users.FirstOrDefault(u => u.Email == email);
        }

        public bool AddUser(User user)
        {
            var ctx = new MaaserTrackerDataContext(_connectionS);

            if(GetUserByEmail(user.Email) == null)
            {
                return false;
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            ctx.Users.Add(user);
            ctx.SaveChanges();
            return true;
        }

        public User VerifyLogin(string email, string password)
        {

            var user = GetUserByEmail(email);
            if(user == null)
            {
                return null;
            }

            if(BCrypt.Net.BCrypt.Verify(password,user.Password))
            {
                return user;
            }

            return null;
        }
    }
}
#endif
